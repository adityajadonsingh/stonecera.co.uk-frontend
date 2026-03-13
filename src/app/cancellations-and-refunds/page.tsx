import PageBanner from "@/components/PageBanner";
import { getPolicy } from "@/lib/api/policy";
import PageBannerImg from "../../../public/media/bg/image.webp";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Cancellations & Refunds Policy | Stonecera Natural Stone",
      meta_description:
        "Learn about Stonecera's cancellations and refunds policy covering order changes, returns, and refund processes for natural stone tiles.",
      canonical_tag: "https://stonecera.co.uk/cancellations-and-refunds",  
      robots: "index, follow",
    },
  };
  if (!data) return {};
  return buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export default async function CancellationsAndRefundsPage() {
  const data = await getPolicy("Cancellations_Refunds");
  if (!data) return null;
  return (
    <>
      <PageBanner
        pageName="Cancellations And Refund Policy"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Cancellations And Refund",
            pageUrl: "/cancellations-and-refunds/",
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
