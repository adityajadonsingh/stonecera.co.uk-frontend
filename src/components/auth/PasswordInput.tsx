"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  showStrength?: boolean;
};

function getStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "25%" };
  if (score === 2) return { label: "Medium", color: "bg-yellow-500", width: "50%" };
  if (score === 3) return { label: "Strong", color: "bg-green-500", width: "75%" };

  return { label: "Very Strong", color: "bg-green-700", width: "100%" };
}

export default function PasswordInput({
  label,
  value,
  onChange,
  required,
  showStrength = true,
}: Props) {
  const [show, setShow] = useState(false);

  const strength = getStrength(value);

  return (
    <div>
      <label className="text-sm block mb-1">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded p-2 pr-10"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer text-gray-500 hover:text-gray-700"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {showStrength && value && (
        <div className="mt-2">
          <div className="h-2 w-full bg-gray-200 rounded">
            <div
              className={`h-2 rounded ${strength.color}`}
              style={{ width: strength.width }}
            />
          </div>

          <p className="text-xs mt-1 text-gray-600">
            Password strength: {strength.label}
          </p>
        </div>
      )}
    </div>
  );
}