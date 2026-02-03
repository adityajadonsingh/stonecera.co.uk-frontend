
import { getHomepage } from "@/lib/api/homepage";
import HomeBannerSlider from "@/components/homepage/HomeBannerSlider";
import FeaturedCategories from "@/components/homepage/FeaturedCategories";
import BestSeller from "@/components/homepage/BestSeller";
import PageContent1 from "@/components/homepage/PageContent1";
import ReviewSection from "@/components/homepage/ReviewSection";
import BlogsSection from "@/components/homepage/BlogsSection";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import ContactForm from "@/components/homepage/ContactForm";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import SchemaInjector from "@/components/SchemaInjector";

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
  if (!homepage) return <p>Unable to load homepage</p>;
  return (
    <>
       <HomeBannerSlider banners={homepage.banner} />
       <FeaturedCategories content={homepage.featuredCategory}/>
       <PageContent1 />
       <BestSeller content={homepage.bestSeller}/>
       <ReviewSection content={homepage.reviews} isProductPage={false} />
       <BlogsSection blogs={homepage.blogs}/>
       <WhyChooseUs/>
       <ContactForm page="homepage"/>
       <SchemaInjector schemas={homepage.seo?.schemas} />
    </>
  );
}