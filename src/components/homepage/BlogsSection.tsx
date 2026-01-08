import { Blog } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Clock, User } from "lucide-react";

export default function BlogsSection({ blogs }: { blogs: Blog[] }) {
  console.log(blogs);
  return (
    <section className="homeBlogs py-16">
      <div className="container">
        <div className="grid grid-cols-[2fr_1fr] items-center gap-2 mb-10">
          <div className="col">
            <h2 className="text-3xl heading font-bold  mb-2">
              Our Latest Blogs
            </h2>
            <p className="text-lg text-dark opacity-95 ">
              Read our latest blogs and get relevant information about natural
              stone paving slabs and engineered stones.
            </p>
          </div>
          <div className="flex justify-end">
            <Link href={"/blogs/"}>
              <button className="button-1 py-3 px-4">
                View All Blogs
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
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
                      <span className="capitalize text-sm">{blog.author}</span>
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
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${blog.image.url}`}
                    alt={blog.image.alt || blog.title}
                    fill
                    className="object-cover rounded-sm group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg capitalize font-semibold text-dark my-3">
                  {blog.title}
                </h3>
                <p className="text-sm line-clamp-2">{blog.shortDescription}</p>
                <button className="button-logo-1 cursor-pointer py-1 px-3 mt-3 text-sm rounded-sm">
                  Read More
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
