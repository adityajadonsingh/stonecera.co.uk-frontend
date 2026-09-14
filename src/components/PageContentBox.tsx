"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function PageContentBox({
  content,
  isFullPage,
}: {
  content: string;
  isFullPage: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(400);

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = contentRef.current;

    if (!element || isFullPage) return;

    const measureHeight = () => {
      setContentHeight(element.scrollHeight);
    };

    // Wait until the HTML content has rendered
    requestAnimationFrame(measureHeight);
  }, [content, isFullPage]);

  const hasMoreContent = contentHeight > 400;

  return (
    <section className="bg-[#f9f7f3] py-2 lg:py-6 lg:pt-0">
      <div>
        <div className="bg-[#f5f0e8] px-5 py-4 sm:px-8 md:py-8 lg:px-12 lg:py-10">

          {isFullPage ? (
            <div
              className="
                prose
                max-w-none
                text-sm
                leading-relaxed
                text-[#4a5530]

                [&_h2]:font-serif
                [&_h2]:text-2xl
                [&_h2]:font-normal
                [&_h2]:text-[#262a18]

                [&_h3]:font-serif
                [&_h3]:text-xl
                [&_h3]:font-normal
                [&_h3]:text-[#262a18]

                [&_p]:mb-4
                [&_p:last-child]:mb-0

                [&_a]:text-[#99a14e]
                [&_a]:underline
                [&_a]:underline-offset-2

                [&_ul]:pl-5
                [&_ol]:pl-5
              "
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <>
              <div className="relative">
                <div
                  ref={contentRef}
                  className="
                    prose
                    max-w-none
                    overflow-hidden
                    text-sm
                    leading-relaxed
                    text-[#4a5530]

                    transition-[max-height]
                    duration-500
                    ease-in-out

                    [&_h2]:font-serif
                    [&_h2]:text-2xl
                    [&_h2]:font-normal
                    [&_h2]:text-[#262a18]

                    [&_h3]:font-serif
                    [&_h3]:text-xl
                    [&_h3]:font-normal
                    [&_h3]:text-[#262a18]

                    [&_p]:mb-4
                    [&_p:last-child]:mb-0

                    [&_a]:text-[#99a14e]
                    [&_a]:underline
                    [&_a]:underline-offset-2

                    [&_ul]:pl-5
                    [&_ol]:pl-5
                  "
                  style={{
                    maxHeight: isExpanded
                      ? `${contentHeight}px`
                      : "400px",
                  }}
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {!isExpanded && hasMoreContent && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      left-0
                      right-0
                      h-24
                      bg-gradient-to-t
                      from-[#f5f0e8]
                      to-transparent
                    "
                  />
                )}
              </div>

              {hasMoreContent && (
                <div className="mt-7 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    className="
                      group
                      flex
                      cursor-pointer
                      items-center
                      gap-2
                      border-b
                      border-[#d8c06a]
                      pb-1
                      text-xs
                      font-medium
                      uppercase
                      tracking-[0.15em]
                      text-[#262a18]
                      transition-colors
                      duration-300
                      hover:text-[#99a14e]
                    "
                  >
                    <span>
                      {isExpanded ? "Show Less" : "Read More"}
                    </span>

                    <ChevronDown
                      size={14}
                      strokeWidth={1.5}
                      className={`
                        text-[#99a14e]
                        transition-transform
                        duration-300
                        ${isExpanded ? "rotate-180" : "rotate-0"}
                      `}
                    />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}