import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { getBlogBySlug } from "@/lib/api/blog";
import Breadcrum from "@/components/Breadcrum";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);
  if (!data?.blog) return notFound();

  const { blog, recentBlogs } = data;

  return (
    <>
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* LEFT CONTENT */}
            <article className="lg:col-span-3">
              <div className="text-sm text-gray-500 mb-3">
                <Breadcrum
                  breadcrum={[
                    {
                      pageName: "Blog",
                      pageUrl: "/blogs/",
                    },
                    {
                      pageName: blog.title,
                      pageUrl: `/blogs/${blog.slug}/`,
                    },
                  ]}
                />
              </div>
              <h1 className="text-3xl font-bold mb-4 heading">{blog.title}</h1>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-4">Recent Blogs</h3>

              <div className="space-y-4">
                {recentBlogs.map((b: any) => (
                  <Link
                    key={b.slug}
                    href={`/blogs/${b.slug}`}
                    className="group block"
                  >
                    <div className="relative h-[120px] w-full overflow-hidden rounded">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${b.image.url}`}
                        alt={b.image.alt || b.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                        <h4 className="text-white text-sm font-semibold leading-snug">
                          {b.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
