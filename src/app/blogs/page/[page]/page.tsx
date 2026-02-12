import { redirect } from "next/navigation";
import { getBlogs } from "@/lib/api/blog";
import Pagination from "@/components/category/Pagination";
import PageBanner from "@/components/PageBanner";
import PageBannerImg from "../../../../../public/media/bg/image.webp";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";
export default async function BlogsPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  if (!pageNum || pageNum === 1) {
    redirect("/blogs");
  }
  const { data: blogs, meta } = await getBlogs({ page: pageNum, limit: 12 });

  return (
    <>
      <PageBanner
        pageName="Blogs"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Blogs",
            pageUrl: "/blogs/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />

      <section className="blogs py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog, i) => (
              <Link
                className="group"
                key={`blog-${i}`}
                href={`/blogs/${blog.slug}`}
              >
                <div className="p-4 h-full shadow-sm group-hover:shadow-lg bg-skin rounded-sm">
                  <div className="relative overflow-hidden rounded-sm h-[250px] w-full">
                    <div className="absolute items-center rounded-sm py-1 px-2 bg-[#bd7e40] text-white flex gap-x-1 z-10 top-1 left-1">
                      <div className="flex items-center gap-x-1">
                        <User size={14} />
                        <span className="capitalize text-sm">
                          {blog.author}
                        </span>
                      </div>
                      <span>|</span>
                      <div className="flex items-center gap-x-1">
                        <Clock size={14} />
                        <span className="capitalize text-sm">
                          {blog.createdOn}
                        </span>
                      </div>
                    </div>

                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${blog.image?.url}`}
                      alt={blog.image?.alt || blog.title}
                      fill
                      className="object-cover rounded-sm group-hover:scale-105 transition"
                    />
                  </div>

                  <div className="flex flex-col justify-between h-[calc(100%-250px)]">
                    <div>
                      <h3 className="text-lg capitalize font-semibold text-dark my-3">
                        {blog.title}
                      </h3>
                      <p className="text-sm line-clamp-2">
                        {blog.shortDescription}
                      </p>
                    </div>

                    <button className="button-logo-1 w-fit cursor-pointer py-1 px-3 mt-3 text-sm rounded-sm">
                      Read More
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Pagination
            totalPages={meta.pageCount}
            currentPage={1}
            category="blogs"
            currentFilters={{}}
          />
        </div>
      </section>
    </>
  );
}
 