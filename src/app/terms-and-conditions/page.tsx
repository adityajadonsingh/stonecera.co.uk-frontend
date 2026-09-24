
import { getPolicy } from "@/lib/api/policy";
import Breadcrum from "@/components/Breadcrum";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Terms & Conditions | Stonecera Natural Stone",
      meta_description:
        "Read Stonecera's Terms & Conditions to understand the rules, responsibilities, and terms that apply when using our website and services.",
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

export default async function TermsAndConditionsPage() {
  const data = await getPolicy("Terms_of_use");
  if (!data) return null;
  return (
    <>
      <Breadcrum
        breadcrum={[
          { pageName: "Terms & Conditions Policy", pageUrl: "" },
        ]}
      />
      <div className="container py-16">
        <h1 className="text-5xl mb-12 text-[#262a18]">
          Terms & Conditions Policy
        </h1>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.pageDescription }}
        />
      </div>
    </>
  );
}
