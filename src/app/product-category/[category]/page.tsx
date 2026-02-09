import Filters from "@/components/category/Filter";
import Pagination from "@/components/category/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import PageBanner from "@/components/PageBanner";
import ProductsPerPageSelector from "@/components/product/ProductsPerPageSelector";
import {
  getAllCategories,
  getCategoryBySlug,
  getCategoryBySlugForMeta,
} from "@/lib/api/category";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import PageContentBox from "@/components/PageContentBox";
import { buildMetadata } from "@/lib/seo";
import { JSONObject, Schema } from "@/lib/types";
import SchemaInjector from "@/components/SchemaInjector";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category: { slug: string }) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string>>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const page = parseInt(resolvedSearchParams.page || "1", 10);

  const hasFilters = Object.keys(resolvedSearchParams).some(
    (key) => !["page", "limit"].includes(key),
  );

  const shouldNoIndex = page > 1 || hasFilters;

  const data = await getCategoryBySlugForMeta(category);
  if (!data) return {};

  const baseMetadata = buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });

  return {
    ...baseMetadata,

    // ✅ override robots ONLY when needed
    robots: shouldNoIndex
      ? { index: false, follow: true }
      : baseMetadata.robots,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  // Determine current page
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  if (page === 1 && resolvedSearchParams.page) {
    redirect(`/product-category/${category}`);
  }

  // Number of products per page (default 12)
  const limit = parseInt(resolvedSearchParams.limit || "12", 10);
  const offset = (page - 1) * limit;

  // Fetch category data
  const categoryData = await getCategoryBySlug(category, {
    ...Object.fromEntries(Object.entries(resolvedSearchParams)),
    limit,
    offset,
  });

  if (!categoryData.name) return notFound();
  const totalProducts = categoryData.totalProducts || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const safeFilterCounts = categoryData.filterCounts ?? {
    price: {},
    colorTone: {},
    finish: {},
    thickness: {},
    size: {},
    pcs: {},
    packSize: {},
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
        name: "Product Category",
        item: "https://stonecera.co.uk/product-category/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryData.name,
        item: `https://stonecera.co.uk/product-category/${categoryData.slug}/`,
      },
    ],
  };

  const normalizeSchema = (schema: Schema | JSONObject): Schema =>
    "schema_json" in schema
      ? (schema as Schema)
      : { id: 0, name: "", schema_json: schema };

  const rawSchemas: (Schema | JSONObject)[] = [
    breadcrumbSchema,
    ...(Array.isArray(categoryData.seo?.schemas) ? categoryData.seo.schemas : []),
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
      <PageBanner
        pageName={categoryData.name}
        pageDescription={categoryData.short_description}
        breadcrum={[
          {
            pageName: "Product Category",
            pageUrl: "/product-category/",
          },
          {
            pageName: categoryData.name,
            pageUrl: `/product-category/${categoryData.slug}/`,
          },
        ]}
        bgImage={`${process.env.NEXT_PUBLIC_MEDIA_URL}${categoryData.bannerImg?.url}`}
      />

      {/* Layout grid */}
      <div className="container px-4 cat-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mb:pt-16 pt-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Filters
              currentFilters={resolvedSearchParams}
              categorySlug={category}
              filterCounts={safeFilterCounts}
            />
          </div>

          {/* Products + Pagination */}
          <div className="lg:col-span-3">
            <div className="flex justify-end mb-4">
              <ProductsPerPageSelector
                currentLimit={limit}
                currentFilters={resolvedSearchParams}
                categorySlug={category}
                currentPage={page}
              />
            </div>

            <ProductGrid products={categoryData.products} />

            <Pagination
              totalPages={totalPages}
              currentPage={page}
              category={category}
              currentFilters={resolvedSearchParams}
            />
          </div>
        </div>

        {categoryData.footerContent && (
          <PageContentBox
            content={categoryData.footerContent}
            isFullPage={true}
          />
        )}
      </div>
      <SchemaInjector schemas={safeSchemas} />
    </>
  );
}
