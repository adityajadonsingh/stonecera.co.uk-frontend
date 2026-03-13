import PageBanner from "@/components/PageBanner";
import { getPolicy } from "@/lib/api/policy";
import PageBannerImg from "../../../public/media/bg/image.webp";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Shipping Policy | Stonecera Indian Natural Stone & Paving",
      meta_description:
        "Read the Stonecera shipping policy for details on delivery times, shipping methods, and order processing for natural stone tiles and paving products.",
      canonical_tag: "https://stonecera.co.uk/shipping-policy",  
      robots: "index, follow",
    },
  };
  if (!data) return {};
  return buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export default async function ShippingPolicyPage() {
  const data = await getPolicy("Shipping_Policy");
  if (!data) return null;
  return (
    <>
      <PageBanner
        pageName="Shipping Policy"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Shipping Policy",
            pageUrl: "/shipping-policy/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />
      <div className="container py-16">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.pageDescription }}
        />
      </div>
    </>
  );
}
