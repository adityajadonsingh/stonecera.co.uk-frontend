import { Blog } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Clock, User } from "lucide-react";

export default function BlogsSection({ blogs }: { blogs: Blog[] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <section className="homeBlogs md:py-24 py-8">
      <div className="container">
        <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 items-center md:gap-2 gap-4 md:mb-10 mb-5">
          <div className="col md:text-start text-center">
            <p className="text-[10px] text-[rgb(153,161,78)] tracking-[0.25em] uppercase mb-2 font-medium">
              Knowledge Hub
            </p>
            <h2 className="sm:text-6xl text-4xl font-medium  mb-2 new-heading">
              The Stonecera Journal
            </h2>
            {/* <p className="md:text-lg text-sm text-dark opacity-95 ">
              Read our latest blogs and get relevant information about natural
              stone paving slabs and engineered stones.
            </p> */}
          </div>
          <div className="flex md:justify-end justify-center">
            <Link href={"/blogs/"}>
              <button className="flex items-center gap-x-2 cursor-pointer text-xs font-semibold border-b-2 border-[#d8c06a] pb-1 tracking-widest uppercase">
                Read All Articles
                <span>
                  <ChevronRight size={16} />
                </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-12">
          {blogs.map((blog, i) => (
            <Link
              className="group"
              key={`blog-${i}`}
              href={`/blogs/${blog.slug}`}
            >
              <div className="h-full">
                <div className="relative aspect-[16/10] overflow-hidden mb-6 shadow-md">
                  {/* <div className="absolute items-center rounded-sm py-1 px-2 bg-[#bd7e40] text-white flex gap-x-1 z-10 top-1 left-1">
                    <div className="flex items-center gap-x-1">
                      <User size={14} />
                      <span className="capitalize text-sm">{blog.author}</span>
                    </div>
                    <span>|</span>
                    <div className="flex items-center gap-x-1">
                      <Clock size={14} />
                      <span className="capitalize text-sm">
                        {blog.createdOn}
                      </span>
                    </div>
                  </div> */}
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${blog.image.url}`}
                    alt={blog.image.alt || blog.title}
                    fill
                    className="object-cover group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 font-sans">
                  <span className="text-[10px] font-bold text-[#99a14e] mb-2 uppercase tracking-widest block">
                    {formatDate(blog.createdOn)}
                  </span>
                  <h3 className=" text-2xl text-[#262a18] mb-4 group-hover:text-[#a67c52] transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed mb-6 line-clamp-2">
                    {blog.shortDescription}
                  </p>
                  <button className="cursor-pointer text-[10px] font-bold uppercase tracking-[0.2em] text-[#262a18] border-b border-[#262a18]/20 group-hover:border-[#d8c06a] pb-1 transition-all inline-flex items-center gap-2">
                    Read Article
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
