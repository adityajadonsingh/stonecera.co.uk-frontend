import { getHomepage } from "@/lib/api/homepage";
import HomeBannerSlider from "@/components/homepage/HomeBannerSlider";
import FeaturedCategories from "@/components/homepage/FeaturedCategories";
import BestSeller from "@/components/homepage/BestSeller";
import PageContent1 from "@/components/homepage/PageContent1";
import ReviewSection from "@/components/homepage/ReviewSection";
import BlogsSection from "@/components/homepage/BlogsSection";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SchemaInjector from "@/components/SchemaInjector";
import PageContent2 from "@/components/homepage/PageContent2";
import ContactSection from "@/components/homepage/ContactSection";
import FaqsAccordion from "@/components/FaqAccordion";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage();
  if (!data) return {};
  return buildMetadata({
    seo: data.seo,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  });
}

export default async function Home() {
  const homepage = await getHomepage();
  console.log("Homepage data:", homepage);
  if (!homepage) return <p>Unable to load homepage</p>;
  return (
    <>
      <HomeBannerSlider banners={homepage.banner} />
      <FeaturedCategories content={homepage.featuredCategory} />
      <BestSeller content={homepage.bestSeller} />
      <PageContent1 />
      <BlogsSection blogs={homepage.blogs} />
      <ReviewSection content={homepage.reviews} isProductPage={false} />
      <ContactSection page="homepage" />
      <PageContent2 />
      {homepage.faqs ? (
        <FaqsAccordion
          mainHeading={homepage.faqs.mainHeading}
          subHeading={homepage.faqs.subHeading}
          items={homepage.faqs.items}
        />
      ) : (
        <div>No FAQs available</div>
      )}
      <SchemaInjector schemas={homepage.seo?.schemas} />
    </>
  );
}
