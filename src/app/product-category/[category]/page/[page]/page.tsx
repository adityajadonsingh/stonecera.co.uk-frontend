import { notFound, redirect } from "next/navigation";
import { getCategoryBySlug, getCategoryBySlugForMeta } from "@/lib/api/category";
import Filters from "@/components/category/Filter";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/category/Pagination";
import ProductsPerPageSelector from "@/components/product/ProductsPerPageSelector";
import PageBanner from "@/components/PageBanner";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const data = await getCategoryBySlugForMeta(category);
  if (!data) return {};

  const baseMetadata = buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });

  return {
    ...baseMetadata,
    robots: { index: false, follow: true }
  };
}

export default async function CategoryPaginatedPage(props: {
  params: Promise<{ category: string; page: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { category, page: pageParam } = await props.params;
  const searchParams = await props.searchParams;

  const page = parseInt(pageParam || "1", 10);
  // grab limit from query, default to 10
  const limit = parseInt(searchParams.limit || "12", 10);
  const offset = (page - 1) * limit;

  if (page === 1) redirect(`/product-category/${category}`);

  const categoryData = await getCategoryBySlug(category, {
    ...Object.fromEntries(Object.entries(searchParams)),
    limit,
    offset,
  });

  if (!categoryData.name) return notFound();
  const totalProducts = categoryData.totalProducts || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const filterCounts = categoryData.filterCounts ?? {
    price: {},
    colorTone: {},
    finish: {},
    thickness: {},
    size: {},
    pcs: {},
    packSize: {},
  };

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
      <div className="container cat-container px-4">
        

        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 mb:pt-16 pt-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Filters
              currentFilters={searchParams}
              categorySlug={category}
              filterCounts={filterCounts}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Products‑per‑page dropdown */}
            <div className="flex justify-end mb-4">
              <ProductsPerPageSelector
                currentLimit={limit}
                currentFilters={searchParams}
                categorySlug={category}
                currentPage={page}
              />
            </div>

            <ProductGrid products={categoryData.products} />

            <Pagination
              totalPages={totalPages}
              currentPage={page}
              category={category}
              currentFilters={searchParams}
            />
          </div>
        </div>
      </div>
    </>
  );
}
