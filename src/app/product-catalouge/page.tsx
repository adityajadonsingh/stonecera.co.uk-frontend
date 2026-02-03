import PageBanner from "@/components/PageBanner";
import { getCatalogues } from "@/lib/api/catalogue";
import PageBannerImg from "../../../public/media/bg/image.png";
import Image from "next/image";
export default async function ProductCatalougePage() {
  const catalogues = await getCatalogues();
  return (
    <>
      <PageBanner
        pageName="Product Catalouge"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Product Catalogue",
            pageUrl: "/product-catalogue/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogues.map((c) => (
            <a
              key={c.id}
              href={process.env.NEXT_PUBLIC_MEDIA_URL + c.file?.url}
              target="_blank"
              className="group bg-white rounded-md shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative aspect-[2/1]">
                <Image
                  src={process.env.NEXT_PUBLIC_MEDIA_URL + c.thumbnail?.url}
                  alt={c.thumbnail?.alt || c.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-[#4c4331] text-lg group-hover:text-[#cb934f]">
                  {c.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Download PDF</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
