import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

import Pagination from "@/components/Pagination";
import { getBlogs } from "@/lib/api/blog";
import { buildMetadata } from "@/lib/seo";


/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Expert Guides on Natural Stone Tiles | Stonecera Blog",
      meta_description:
        "Read the Stonecera blog for insights on natural stone tiles, paving slabs, patio ideas, and expert tips to create stylish indoor and outdoor spaces.",
      canonical_tag: "https://stonecera.co.uk/blogs",
      robots: "index, follow",
    },
  };

  if (!data) return {};

  return buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}


/* =========================================================
   PAGE
========================================================= */

export default async function BlogsPage() {
  const { data: blogs, meta } = await getBlogs({
    page: 1,
    limit: 12,
  });


  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };


  return (
    <>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="border-b-[0.5px] border-b-[#262a18]/12 bg-[#f5f0e8]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 lg:px-8">

          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-[#99a14e]">
            Stonecera Journal
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <h1
              className="font-serif text-5xl text-[#262a18] lg:text-6xl"
              style={{
                fontFamily: "Instrument Serif, serif",
              }}
            >
              Technical guides,
              <br />
              inspiration &amp; projects.
            </h1>

            <p className="max-w-sm text-sm leading-relaxed text-[#4a5530]">
              Expert knowledge on stone selection, installation, maintenance,
              and the projects that inspire us.
            </p>

          </div>
        </div>
      </div>


      {/* =====================================================
          BLOGS
      ===================================================== */}

      <section className="blogs py-16">
        <div className="container">

          {/* =================================================
              BLOG GRID
          ================================================= */}

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">

            {blogs.map((blog, i) => (
              <Link
                key={`blog-${i}`}
                href={`/blogs/${blog.slug}`}
                className="group"
              >

                <article className="h-full">

                  {/* =========================================
                      IMAGE
                  ========================================= */}

                  <div className="relative mb-6 aspect-[16/10] overflow-hidden shadow-md">

                    {blog.image?.url ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${blog.image.url}`}
                        alt={
                          blog.image.alt ||
                          blog.title
                        }
                        fill
                        sizes="
                          (max-width: 768px) 100vw,
                          (max-width: 1024px) 50vw,
                          33vw
                        "
                        className="
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div className="h-full w-full bg-[#f5f0e8]" />
                    )}

                  </div>


                  {/* =========================================
                      CONTENT
                  ========================================= */}

                  <div className="mt-2 font-sans">

                    {/* Date */}

                    <span className="
                      mb-2
                      block
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-[#99a14e]
                    ">
                      {formatDate(blog.createdOn)}
                    </span>


                    {/* Title */}

                    <h2 className="
                      mb-4
                      text-2xl
                      leading-tight
                      text-[#262a18]
                      transition-colors
                      group-hover:text-[#a67c52]
                    ">
                      {blog.title}
                    </h2>


                    {/* Description */}

                    <p className="
                      mb-6
                      line-clamp-2
                      text-sm
                      leading-relaxed
                      text-stone-500
                    ">
                      {blog.shortDescription}
                    </p>


                    {/* Read Article */}

                    <span className="
                      inline-flex
                      cursor-pointer
                      items-center
                      gap-2
                      border-b
                      border-[#262a18]/20
                      pb-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#262a18]
                      transition-all
                      group-hover:border-[#d8c06a]
                    ">
                      Read Article

                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </span>

                  </div>

                </article>

              </Link>
            ))}

          </div>


          {/* =================================================
              PAGINATION
          ================================================= */}

          <Pagination
            totalPages={meta.pageCount}
            currentPage={1}
            category="blogs"
            currentFilters={{}}
            pageName="blogs"
          />

        </div>
      </section>
    </>
  );
}