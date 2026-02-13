"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PhoneItem = { phone?: string };

/** Minimal shape expected from server's GET /api/user-details */
export type UserDetails = {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: { id?: number | null; url?: string | null } | null;
  phoneNumbers?: PhoneItem[] | null;
};

interface Props {
  initialData?: UserDetails | null;
}

/** helpers */
const absoluteUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  const base = (process.env.NEXT_PUBLIC_MEDIA_URL ?? "").replace(/\/+$/, "");
  return base ? `${base}${url.startsWith("/") ? url : `/${url}`}` : url;
};

const safeString = (v?: unknown) => (typeof v === "string" ? v : "");

/** Extract id/url from upload response (works with your upload proxy) */
function extractFileInfo(json: unknown): {
  id: number | null;
  url: string | null;
} {
  if (!json || typeof json !== "object") {
    return { id: null, url: null };
  }

  const candidates: unknown[] = [];

  // array case
  if (Array.isArray(json) && json.length > 0) {
    candidates.push(json[0]);
  }

  // object cases
  candidates.push(json);

  const data = (json as { data?: unknown }).data;
  if (data) candidates.push(data);

  const attributes = (data as { attributes?: unknown })?.attributes;
  if (attributes) candidates.push(attributes);

  for (const c of candidates) {
    if (!c || typeof c !== "object") continue;

    const obj = c as Record<string, unknown>;

    let id: number | null = null;
    let url: string | null = null;

    if (typeof obj.id === "number") id = obj.id;
    if (typeof obj.id === "string" && !Number.isNaN(Number(obj.id))) {
      id = Number(obj.id);
    }

    if (typeof obj.url === "string") url = obj.url;

    const formats = obj.formats as { small?: { url?: unknown } } | undefined;
    if (!url && typeof formats?.small?.url === "string") {
      url = formats.small.url;
    }

    const nestedAttrs = obj.attributes as { url?: unknown } | undefined;
    if (!url && typeof nestedAttrs?.url === "string") {
      url = nestedAttrs.url;
    }

    if (id !== null || url !== null) {
      return { id, url };
    }
  }

  return { id: null, url: null };
}


/** Component */
export default function UserDetailsForm({ initialData = null }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  // controlled fields
  const [firstName, setFirstName] = useState<string>(
    safeString(initialData?.firstName)
  );
  const [lastName, setLastName] = useState<string>(
    safeString(initialData?.lastName)
  );
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneItem[]>(
    (initialData?.phoneNumbers && initialData.phoneNumbers.length
      ? initialData.phoneNumbers
      : [{ phone: "" }]) as PhoneItem[]
  );

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(
    initialData?.profileImage?.url
      ? absoluteUrl(initialData.profileImage.url)
      : "/media/user.png"
  );
  const [profileImageId, setProfileImageId] = useState<number | null>(
    initialData?.profileImage?.id ?? null
  );

  const [editing, setEditing] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFirstName(safeString(initialData?.firstName));
    setLastName(safeString(initialData?.lastName));
    setPhoneNumbers(
      initialData?.phoneNumbers && initialData.phoneNumbers.length
        ? initialData.phoneNumbers
        : [{ phone: "" }]
    );
    setProfileImageUrl(
      initialData?.profileImage?.url
        ? absoluteUrl(initialData.profileImage.url)
        : "/media/user.png"
    );
    setProfileImageId(initialData?.profileImage?.id ?? null);
  }, [initialData]);

  // phones handlers
  function updatePhone(i: number, value: string) {
    setPhoneNumbers((s) =>
      s.map((p, idx) => (idx === i ? { phone: value } : p))
    );
  }
  function addPhone() {
    setPhoneNumbers((s) => [...s, { phone: "" }]);
  }
  function removePhone(i: number) {
    setPhoneNumbers((s) => s.filter((_, idx) => idx !== i));
  }

  // file upload
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("files", file);

      const res = await fetch("/api/user-details/upload", {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "Upload failed");
        setError(`Upload failed: ${text}`);
        return;
      }

      const json = await res.json().catch(() => null);
      const { id, url } = extractFileInfo(json);

      if (!id || !url) {
        setError("Upload succeeded but response is missing file info.");
        return;
      }

      setProfileImageId(id);
      setProfileImageUrl(absoluteUrl(url));
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  // Cancel editing -> reset to initial values
  function handleCancel() {
    setEditing(false);
    setError(null);
    // reset fields to initialData
    setFirstName(safeString(initialData?.firstName));
    setLastName(safeString(initialData?.lastName));
    setPhoneNumbers(
      initialData?.phoneNumbers && initialData.phoneNumbers.length
        ? initialData.phoneNumbers
        : [{ phone: "" }]
    );
    setProfileImageUrl(
      initialData?.profileImage?.url
        ? absoluteUrl(initialData.profileImage.url)
        : "/media/user.png"
    );
    setProfileImageId(initialData?.profileImage?.id ?? null);
  }

  // Save
  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim() || null;

      const payload = {
        firstName: firstName || null,
        lastName: lastName || null,
        fullName,
        profileImageId: profileImageId ?? null,
        phoneNumbers: phoneNumbers
          .filter((p) => typeof p.phone === "string" && p.phone.trim())
          .map((p) => ({ phone: p.phone?.trim() })),
      };
      const res = await fetch("/api/user-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "Save failed");
        setError(`Save failed: ${text}`);
        return;
      }

      // clear redis cache
      await fetch("/api/user-details", {
        method: "DELETE",
        credentials: "include",
      });

      // 🔥 re-fetch latest clean data from /api/auth/me
      const refreshed = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      }).then((r) => r.json());

      const updated = refreshed?.userDetails ?? {};

      // update UI state with latest data
      setFirstName(updated.firstName ?? "");
      setLastName(updated.lastName ?? "");
      setPhoneNumbers(
        updated?.phoneNumbers?.length ? updated.phoneNumbers : [{ phone: "" }]
      );
      setProfileImageUrl(
        updated?.profileImage?.url
          ? absoluteUrl(updated.profileImage.url)
          : "/media/user.png"
      );
      setProfileImageId(updated?.profileImage?.id ?? null);

      // Now exit edit mode
      setEditing(false);
    } catch (err: unknown) {
      console.error("Save error:", err);
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      {/* top action row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg text-dark font-semibold">Profile</h2>
          <p className="text-sm text-gray-600">
            Edit your name, profile image and phone numbers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!editing ? (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded"
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* First + Last name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!editing}
            className="w-full border rounded p-2"
            placeholder="First name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!editing}
            className="w-full border rounded p-2"
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Profile image */}
      <div>
        <label className="block text-sm font-medium mb-1">Profile image</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profileImageUrl ?? "/media/user.png"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={!editing || uploading}
            />
            {uploading && (
              <div className="text-sm text-gray-600 mt-2">Uploading…</div>
            )}
          </div>
        </div>
      </div>

      {/* Phone numbers */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone numbers</label>
        <div className="space-y-2">
          {phoneNumbers.map((p, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                value={p.phone ?? ""}
                onChange={(e) => updatePhone(i, e.target.value)}
                disabled={!editing}
                className="flex-1 border rounded p-2"
                placeholder="Phone number"
                required={i === 0}
              />
              <button
                type="button"
                onClick={() => removePhone(i)}
                disabled={!editing || phoneNumbers.length === 1}
                className="px-2 py-1 text-sm border rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div>
            <button
              type="button"
              onClick={addPhone}
              disabled={!editing}
              className="px-3 py-1 bg-gray-100 rounded text-sm"
            >
              Add phone
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
