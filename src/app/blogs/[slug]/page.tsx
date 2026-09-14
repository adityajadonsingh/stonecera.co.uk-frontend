import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs } from "@/lib/api/blog";
import Breadcrum from "@/components/Breadcrum";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { JSONObject, Schema } from "@/lib/types";
import SchemaInjector from "@/components/SchemaInjector";
import { Calendar, ChevronRight } from "lucide-react";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);
  if (!data?.blog) return notFound();

  const { blog, recentBlogs } = data;

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

  const commonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://stonecera.co.uk/blogs/${blog.slug}/`,
    },
    headline: blog.title,
    description: blog.shortDescription,
    image: blog.meta_img,
    author: {
      "@type": "Person",
      name: "Jaya Tripathi",
      url: "https://stonecera.co.uk/author/jaya_tripathi/",
    },
    publisher: {
      "@type": "Organization",
      name: "Stonecera",
      logo: {
        "@type": "ImageObject",
        url: "https://stonecera.co.uk/media/logo.svg",
      },
    },
    datePublished: new Date(blog.createdOn).toISOString(),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://stonecera.co.uk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://stonecera.co.uk/blogs/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `https://stonecera.co.uk/blogs/${blog.slug}/`,
      },
    ],
  };
  const normalizeSchema = (schema: Schema | JSONObject): Schema =>
    "schema_json" in schema
      ? (schema as Schema)
      : { id: 0, name: "", schema_json: schema };

  const rawSchemas: (Schema | JSONObject)[] = [
    breadcrumbSchema,
    commonSchema,
    ...(Array.isArray(blog?.schema_markup) ? blog?.schema_markup : []),
  ];

  const safeSchemas: Schema[] = Array.from(
    new Map(
      rawSchemas.map((schema) => {
        const normalized = normalizeSchema(schema);
        return [JSON.stringify(normalized.schema_json), normalized];
      }),
    ).values(),
  );

  return (
    <>
      <div className="border-b-[0.5px] border-[rgba(38,42,24,0.12)]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1440px] px-4 py-3 lg:px-8"
        >
          <ol className="flex flex-wrap font-sans items-center gap-1.5 text-xs">
            <li>
              <Link
                href="/"
                className="text-stone-500 transition-colors hover:text-[#99a14e]"
              >
                Home
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight
                size={13}
                strokeWidth={1.5}
                className="text-stone-400"
              />
            </li>

            <li>
              <Link
                href="/product-category/"
                className="text-stone-500 transition-colors hover:text-[#99a14e]"
              >
                Blogs
              </Link>
            </li>

            <li aria-hidden="true">
              <ChevronRight
                size={13}
                strokeWidth={1.5}
                className="text-stone-400"
              />
            </li>

            {/* Current Page */}
            <li>
              <span
                aria-current="page"
                className="font-semibold text-[#262a18]"
              >
                {blog.title}
              </span>
            </li>
          </ol>
        </nav>
      </div>
      <section className="md:py-16 py-8 bg-[#f9f7f3]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-6 lg:gap-16 gap-10">
            {/* LEFT CONTENT */}
            <article className="lg:col-span-4">
              <div className="flex gap-x-2 items-center mb-4">
                <Calendar size={16} color="#99a14e" />
                <span
                  className="
                      block
                      text-xs
                      font-medium
                      uppercase
                      tracking-widest
                      text-[#99a14e]
                    "
                >
                  {formatDate(blog.createdOn)}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl text-[#262a18] leading-none mb-8">
                {blog.title}
              </h1>
              <div className="aspect-4/2 overflow-hidden border border-stone-200">
                <Image
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${blog.image.url}`}
                  alt="Luxury garden patio with Raj Green sandstone paving at sunset"
                  width={960}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="prose max-w-none blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:col-span-2">
              <div className="bg-[#f5f0e8] p-8 border border-stone-200">
                <h3 className="text-2xl text-[#262a18] mb-6">Recent Posts</h3>

                <div className="space-y-6">
                  {recentBlogs.map((b: any) => (
                    <Link
                      key={b.slug}
                      href={`/blogs/${b.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/2] overflow-hidden ">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${b.image.url}`}
                          alt={b.image.alt || b.title}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(38, 42, 24, 0.85) 0%, rgba(38, 42, 24, 0.1) 60%)",
                          }}
                        ></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <h4 className="text-white text-sm font-medium leading-snug">
                            {b.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <SchemaInjector schemas={safeSchemas} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);
  if (!data) return {};
  return buildMetadata({
    seo: data.blog?.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs.data.map((blog) => ({
    slug: blog.slug,
  }));
}
