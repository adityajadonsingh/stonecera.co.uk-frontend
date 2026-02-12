import { redirect } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import ProductsPerPageSelectorProducts from "@/components/product/ProductsPerPageSelectorProducts";
import PaginationProducts from "@/components/product/PaginationProducts";
import { getAllProducts } from "@/lib/api/product";
import PageBanner from "@/components/PageBanner";
import PageBannerImg from "../../../../../public/media/bg/image.webp";
export const metadata = {
  robots: "noindex, follow",
};

export default async function ProductsPaginatedPage({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { page: pageParam } = await params;
  const resolvedSearchParams = await searchParams;

  const page = parseInt(pageParam || "1", 10);

  if (page === 1) redirect("/products");

  const limit = parseInt(resolvedSearchParams.limit || "12", 10);
  const offset = (page - 1) * limit;

  const data = await getAllProducts({ limit, offset });
  const totalPages = Math.ceil(data.totalProducts / limit);

  return (
    <>
      <PageBanner
        pageName="Products"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Products",
            pageUrl: "/products/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />
      <div className="container px-4 py-16">
        {/* Products per page */}
        <div className="flex justify-end mb-4">
          <ProductsPerPageSelectorProducts
            currentLimit={limit}
            currentFilters={resolvedSearchParams}
          />
        </div>

        {/* Product grid */}
        <ProductGrid products={data.products} />

        {/* Pagination */}
        <PaginationProducts
          totalPages={totalPages}
          currentPage={page}
          currentFilters={resolvedSearchParams}
        />
      </div>
    </>
  );
}
