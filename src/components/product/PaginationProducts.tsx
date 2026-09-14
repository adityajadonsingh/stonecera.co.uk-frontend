"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    const params = new URLSearchParams();

    Object.entries(currentFilters).forEach(([key, value]) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });

    params.delete("page");

    const qs = params.toString();

    const url =
      page === 1
        ? `/products${qs ? `?${qs}` : ""}`
        : `/products/page/${page}${qs ? `?${qs}` : ""}`;

    router.push(url);
  };

  /*
   * ---------------------------------------------------------
   * Generate visible page numbers
   * ---------------------------------------------------------
   *
   * <= 4 pages:
   *
   * 1  2  3  4
   *
   * More pages:
   *
   * First pages:
   * 1  2  3  4 ... 20
   *
   * Middle:
   * 1 ... 9 10 11 ... 20
   *
   * Last:
   * 1 ... 17 18 19 20
   */
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 4) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    }

    // Beginning
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    // End
    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Middle
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPages();

  return (
    <nav
      aria-label="Products pagination"
      className="mt-12 flex w-full justify-center"
    >
      <div className="flex max-w-full items-center overflow-hidden rounded-sm">
        {/* Previous */}
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="
          cursor-pointer
            flex h-10 shrink-0 items-center gap-1
            bg-white px-3 sm:px-4
            text-sm font-medium text-[#4a3a2a]
            transition-colors
            hover:bg-[#f7f3eb]
            disabled:cursor-not-allowed
            disabled:text-gray-300
          "
          aria-label="Previous page"
        >
          <ChevronLeft size={16} strokeWidth={1.5} />

          <span className="hidden xs:inline sm:inline">
            Previous
          </span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="
                    flex h-10 w-8 shrink-0
                    items-center justify-center
                    bg-white
                    text-sm text-[#4a3a2a]
                  "
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                aria-current={isActive ? "page" : undefined}
                className={`
                  cursor-pointer
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? "bg-[#262a18] text-white"
                      : "bg-white text-[#4a3a2a] hover:bg-[#f7f3eb]"
                  }
                `}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
          cursor-pointer
            flex h-10 shrink-0 items-center gap-1
            bg-white px-3 sm:px-4
            text-sm font-medium text-[#4a3a2a]
            transition-colors
            hover:bg-[#f7f3eb]
            disabled:cursor-not-allowed
            disabled:text-gray-300
          "
          aria-label="Next page"
        >
          <span>Next</span>

          <ChevronRight size={16} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}