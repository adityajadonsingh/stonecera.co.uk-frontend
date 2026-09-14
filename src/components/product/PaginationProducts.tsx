"use client";

import { useRouter } from "next/navigation";

interface Props {
  totalPages: number;
  currentPage: number;
  currentFilters: Record<string, string>;
}

export default function PaginationProducts({
  totalPages,
  currentPage,
  currentFilters,
}: Props) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(currentFilters).forEach(([k, v]) => {
      if (typeof v === "string") params.set(k, v);
    });

    params.delete("page");

    const qs = params.toString();
    const url =
      page === 1
        ? `/products${qs ? `?${qs}` : ""}`
        : `/products/page/${page}${qs ? `?${qs}` : ""}`;

    router.push(url);
  };

  return (
    <nav className="flex justify-center mt-8 gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`px-3 py-1 rounded-sm text-lg font-medium w-[40px] ${
            p === currentPage
              ? "bg-[#4c4331] text-white"
              : "bg-[#f7f3eb] text-[#4a3a2a] hover:bg-[#4c4331] hover:text-white"
          }`}
        >
          {p}
        </button>
      ))}
    </nav>
  );
}
