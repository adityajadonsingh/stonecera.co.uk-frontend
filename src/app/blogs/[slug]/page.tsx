import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs } from "@/lib/api/blog";
import Breadcrum from "@/components/Breadcrum";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";
import { JSONObject, Schema } from "@/lib/types";
import SchemaInjector from "@/components/SchemaInjector";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const data = await getBlogBySlug(slug);
  if (!data?.blog) return notFound();

  const { blog, recentBlogs } = data;

  const commonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://stonecera.co.uk/blogs/${blog.slug}/`,
    },
    headline: blog.title,
    description: blog.meta_description,
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
    datePublished: new Date(blog.date_posted).toISOString(),
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
      <section className="md:py-16 py-8">
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
