
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getHomepage } from "@/lib/api/homepage";
import HomeBannerSlider from "@/components/homepage/HomeBannerSlider";
import FeaturedCategories from "@/components/homepage/FeaturedCategories";
import BestSeller from "@/components/homepage/BestSeller";
import PageContent1 from "@/components/homepage/PageContent1";
import ReviewSection from "@/components/homepage/ReviewSection";
import BlogsSection from "@/components/homepage/BlogsSection";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import ContactForm from "@/components/homepage/ContactForm";

export default async function Home() {
  const homepage = await getHomepage();
  if (!homepage) return <p>Unable to load homepage</p>;
  return (
    <>
       <HomeBannerSlider banners={homepage.banner} />
       <FeaturedCategories content={homepage.featuredCategory}/>
       <PageContent1 />
       <BestSeller content={homepage.bestSeller}/>
       <ReviewSection content={homepage.reviews}/>
       <BlogsSection blogs={homepage.blogs}/>
       <WhyChooseUs/>
       <ContactForm/>
    </>
  );
}