import PageBanner from "@/components/PageBanner";
import PageBannerImg from "../../../public/media/bg/image.webp";
import ContactForm from "@/components/homepage/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = {
    seo: {
      meta_title:
        "Get in Touch with Stonecera | Premium Natural Stone Supplier",
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
  return (
    <>
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              Contact Us
            </h1>

            <p className="text-lg text-slate-600">
              Have questions about our premium stone products or need technical
              advice for your project? Our experts are here to help you every
              step of the way.
            </p>
          </div>
        </div>
      </section>
      <ContactForm page="contact-us" />
    </>
  );
}
