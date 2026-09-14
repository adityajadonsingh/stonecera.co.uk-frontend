import { BreadcrumType } from "@/lib/types";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Breadcrum({
  breadcrum,
  isCenter = false,
  border = true,
}: {
  breadcrum: BreadcrumType[];
  isCenter?: boolean;
  border?: boolean;
}) {
  return (
    <div
      className={
        border
          ? "border-b-[0.5px] border-[rgba(38,42,24,0.12)]"
          : ""
      }
    >
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-[1440px] px-4 py-3 lg:px-8"
      >
        <ol
          className={`flex flex-wrap items-center gap-1.5 font-sans text-xs ${
            isCenter ? "justify-center" : ""
          }`}
        >
          {/* Home */}
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-stone-500 transition-colors hover:text-[#99a14e]"
            >
              <Home size={14} strokeWidth={1.5} />
              <span>Home</span>
            </Link>
          </li>

          {/* Separator */}
          <li aria-hidden="true">
            <ChevronRight
              size={13}
              strokeWidth={1.5}
              className="text-stone-400"
            />
          </li>

          {/* Breadcrumb Items */}
          {breadcrum.map((bread, idx) => {
            const isLast = idx === breadcrum.length - 1;

            if (isLast) {
              return (
                <li key={`bread-${idx}`}>
                  <span
                    aria-current="page"
                    className="font-semibold capitalize text-[#262a18]"
                  >
                    {bread.pageName}
                  </span>
                </li>
              );
            }

            return (
              <React.Fragment key={`bread-frag-${idx}`}>
                <li>
                  <Link
                    href={bread.pageUrl}
                    className="capitalize text-stone-500 transition-colors hover:text-[#99a14e]"
                  >
                    {bread.pageName}
                  </Link>
                </li>

                <li aria-hidden="true">
                  <ChevronRight
                    size={13}
                    strokeWidth={1.5}
                    className="text-stone-400"
                  />
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}