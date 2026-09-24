import { getPolicy } from "@/lib/api/policy";
import Breadcrum from "@/components/Breadcrum";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Cookie Policy | Stonecera Natural Stone",
      meta_description:
        "Learn how Stonecera uses cookies on our website, including how cookies work, why we use them, and how you can manage your cookie preferences.",
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

export default async function CookiePolicyPage() {
  const data = await getPolicy("Cookie_Policy");
  if (!data) return null;
  return (
    <>
      <Breadcrum breadcrum={[{ pageName: "Cookie Policy", pageUrl: "" }]} />
      <div className="container py-16">
        <h1 className="text-5xl mb-12 text-[#262a18]">Cancellations & Refunds Policy</h1>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.pageDescription }}
        />
      </div>
    </>
  );
}
