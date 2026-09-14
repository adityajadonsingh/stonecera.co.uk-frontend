"use client";
import { useEffect, useRef, useState } from "react";

export default function PageContentBox({
  content,
  isFullPage,
}: {
  content: string;
  isFullPage: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content, isExpanded]);

  return (
    <section className="pg-des">
      <div className="wrapper">
        <div className="inner-wrapper bg-skin  rounded-xs">
          {isFullPage ? (
            <>
              <div className="relative">
                <div
                  className={`prose max-w-none`}
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>

              </div>

              
            </>
          ) : (
            <>
              <div className="relative">
                <div
                  ref={contentRef}
                  className={`prose max-w-none transition-all duration-500 ease-in-out overflow-hidden`}
                  style={{
                    maxHeight: isExpanded ? `${contentHeight}px` : "400px",
                  }}
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>

                {!isExpanded && contentHeight > 400 && (
                  <div className="fade-overlay"></div>
                )}
              </div>

              {contentHeight > 400 && (
                <div className="flex justify-center cursor-pointer">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 cursor-pointer  underline focus:outline-none pointer-cursor read-btn"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
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
