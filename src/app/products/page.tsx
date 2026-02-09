import PageBanner from "@/components/PageBanner";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/api/product";
import PaginationProducts from "@/components/product/PaginationProducts";
import ProductsPerPageSelectorProducts from "@/components/product/ProductsPerPageSelectorProducts";
import PageBannerImg from "../../../public/media/bg/image.png";
export const metadata = {
  title: "Products",
  robots: "index, follow",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const resolvedSearchParams = await searchParams;

  const page = parseInt(resolvedSearchParams.page || "1", 10);
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
        <div className="flex justify-end mb-4">
          <ProductsPerPageSelectorProducts
            currentLimit={limit}
            currentFilters={resolvedSearchParams}
          />
        </div>

        <ProductGrid products={data.products} />

        <PaginationProducts
          totalPages={totalPages}
          currentPage={page}
          currentFilters={resolvedSearchParams}
        />
      </div>
    </>
  );
}
