import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/api/category";
import PageBanner from "@/components/PageBanner";
import PageBannerImg from "../../../public/media/bg/image.webp";
import FaqAccordion from "@/components/FaqAccordion";

const sizes = [
  "medium", // 1
  "tall", // 2
  "medium", // 3
  "tall", // 4
  "tall", // 5
  "tall", // 6
  "medium", // 7
  "medium", // 8
];

const faqData = [
  {
    question: "What is the future of the granite stone?",
    answer:
      "Granite continues to be one of the most durable and stylish natural stones, widely used in kitchens, flooring and outdoor spaces.",
  },
  {
    question: "Use of Porcelain tiles?",
    answer:
      "Porcelain tiles are perfect for both indoor and outdoor spaces due to their strength, low water absorption and modern look.",
  },
  {
    question: "What stone is more suitable for gardens?",
    answer:
      "Natural stones like sandstone, limestone and cobblestone are ideal for garden pathways and landscaping.",
  },
  {
    question: "How to lie cobblestone?",
    answer:
      "Cobblestones should be laid on a compacted base with sand or mortar, ensuring proper drainage and alignment.",
  },
];

export default async function ProductCategoryPage() {
  const categories = await getAllCategories();

  return (
    <>
      <PageBanner
        pageName="Product Category"
        pageDescription={null}
        breadcrum={[
          {
            pageName: "Product Category",
            pageUrl: "/product-category/",
          },
        ]}
        bgImage={PageBannerImg.src}
      />
      <div className="container py-10">
        <h2 className="text-center md:text-3xl text-2xl heading font-bold mb-10">
          Explore Our Diverse Product Categories
          <span className="block w-20 h-1 bg-[#c98b4c] mx-auto mt-2 rounded-full" />
        </h2>
        <div className="stone-grid mb-10">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/product-category/${cat.slug}`}
              className={`stone-item shadow-md group overflow-hidden ${sizes[i]}`}
            >
              <Image
                src={process.env.NEXT_PUBLIC_MEDIA_URL + cat.images[0].url}
                alt={cat.images[0].alt || cat.name}
                fill
                className="object-cover group-hover:scale-105"
              />
              <div className="absolute bottom-[3%] rounded-md backdrop-blur-[2px] w-[95%] left-[50%] translate-x-[-50%] z-10 text-white bg-[#4c4331]/70 text-center py-2 px-2 font-semibold">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
        <FaqAccordion items={faqData} />
      </div>
    </>
  );
}
