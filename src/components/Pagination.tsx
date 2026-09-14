"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  category: string;
  currentFilters: Record<string, string>;
  pageName?: string;
}

export default function Pagination({
  totalPages,
  currentPage,
  category,
  currentFilters,
  pageName = "product-category",
}: PaginationProps) {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const handleNavigation = (page: number) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    const params = new URLSearchParams();

    Object.entries(currentFilters).forEach(([key, value]) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });

    // Remove previous page parameter
    params.delete("page");

    const qs = params.toString();

    let targetUrl = "";

    switch (pageName) {
      case "product-category":
        if (page === 1) {
          targetUrl = `/product-category/${category}${
            qs ? `?${qs}` : ""
          }`;
        } else {
          targetUrl = `/product-category/${category}/page/${page}${
            qs ? `?${qs}` : ""
          }`;
        }
        break;

      case "blogs":
        if (page === 1) {
          targetUrl = `/blogs${qs ? `?${qs}` : ""}`;
        } else {
          targetUrl = `/blogs/page/${page}${
            qs ? `?${qs}` : ""
          }`;
        }
        break;
    }

    if (targetUrl) {
      router.push(targetUrl);
    }
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
   * Beginning:
   *
   * 1  2  3  4 ... 20
   *
   * Middle:
   *
   * 1 ... 9 10 11 ... 20
   *
   * End:
   *
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
      aria-label={
        pageName === "blogs"
          ? "Blogs pagination"
          : "Product category pagination"
      }
      className="my-8 flex w-full justify-center"
    >
      <div className="flex max-w-full items-center overflow-hidden rounded-sm">
        {/* Previous */}
        <button
          type="button"
          onClick={() => handleNavigation(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            flex h-10 shrink-0 cursor-pointer items-center gap-1
            bg-white px-3 text-sm font-medium text-[#4a3a2a]
            transition-colors hover:bg-[#f7f3eb]
            disabled:cursor-not-allowed disabled:text-gray-300
            sm:px-4
          "
          aria-label="Previous page"
        >
          <ChevronLeft
            size={16}
            strokeWidth={1.5}
          />

          <span>Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="
                    flex h-10 w-8 shrink-0 items-center
                    justify-center bg-white
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
                onClick={() => handleNavigation(page)}
                aria-current={
                  isActive ? "page" : undefined
                }
                className={`
                  flex h-10 w-10 shrink-0 cursor-pointer
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
          onClick={() => handleNavigation(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            flex h-10 shrink-0 cursor-pointer items-center gap-1
            bg-white px-3 text-sm font-medium text-[#4a3a2a]
            transition-colors hover:bg-[#f7f3eb]
            disabled:cursor-not-allowed disabled:text-gray-300
            sm:px-4
          "
          aria-label="Next page"
        >
          <span>Next</span>

          <ChevronRight
            size={16}
            strokeWidth={1.5}
          />
        </button>
      </div>
    </nav>
  );
}