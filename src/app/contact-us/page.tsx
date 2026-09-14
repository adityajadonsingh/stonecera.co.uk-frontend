import PageBanner from "@/components/PageBanner";
import PageBannerImg from "../../../public/media/bg/image.webp";
import ContactForm from "@/components/homepage/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title: "Get in Touch with Stonecera | Premium Natural Stone Supplier",
      meta_description:
        "Contact Stonecera for premium natural stone tiles, paving slabs, and flooring. Get expert support, product details, and the best solutions for your project.",
      canonical_tag: "https://stonecera.co.uk/contact-us",  
      robots: "index, follow",
    },
  };
  if (!data) return {};
  return buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export default function ContactUsPage() {
    return <>
    <PageBanner
        pageName="Contact Us"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Contact Us",
            pageUrl: "/contact-us/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />
      <ContactForm page="contact-us"/>
    </>;
}