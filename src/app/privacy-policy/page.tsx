
import { getPolicy } from "@/lib/api/policy";
import Breadcrum from "@/components/Breadcrum";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";


export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Privacy Policy | Stonecera Indian Natural Stone & Paving",
      meta_description:
        "Read Stonecera's Privacy Policy to understand how we collect, use, protect, and manage your personal information when you visit or use our website.",
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

export default async function PrivacyPolicyPage() {
  const data = await getPolicy("Privacy_Policy");
  if (!data) return null;
  return (
    <>
      <Breadcrum breadcrum={[{pageName: "Privacy Policy", pageUrl: ""}]} />
      <div className="container py-16">
        <h1 className="text-5xl mb-12 text-[#262a18]">Privacy Policy</h1>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.pageDescription }}
        />
      </div>
    </>
  );
}
