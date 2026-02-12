import Link from "next/link";
import Image from "next/image";
import { FeaturedCategoriesSection } from "@/lib/types";
import { MoveRight } from "lucide-react";

export default function FeaturedCategories({
  content,
}: {
  content: FeaturedCategoriesSection;
}) {
  console.log(`${process.env.NEXT_PUBLIC_MEDIA_URL}${content.categories[0].images[0].url}`);
  return (
    <>
      <section className="featuredCategory md:py-16 py-8">
        <div className="container">
          <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 items-center md:gap-2 gap-4 md:mb-10 mb-5">
            <div className="col md:text-start text-center">
              <h2 className="sm:text-3xl text-2xl heading font-bold  mb-2">
                {content.sectionTitle}
              </h2>
              <p className="md:text-lg text-sm text-dark opacity-95 ">
                {content.sectionSubtitle}
              </p>
            </div>
            <div className="flex md:justify-end justify-center">
              <Link href={"/product-category/"}>
                <button className="button-1 cursor-pointer md:py-3 py-2 md:text-base text-sm md:px-4 px-3 ">
                  View All Categories
                </button>
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 grid-cols-1 md:gap-5 gap-2">
            {content.categories.map((category, i) => (
              <Link
                className="group"
                href={`/product-category/${category.slug}/`}
                key={`featured-category-${i}`}
              >
                <div
                  className="w-full h-[350px] relative overflow-hidden rounded-md"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${category.images[0].url}`}
                    alt={category.images[0].alt || category.name}
                    fill
                    className="object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className="absolute top-0 left-0 w-full h-[55%] z-10 
                    bg-gradient-to-b from-black/90 via-black/10 to-transparent"
                  ></div>

                  <div className="absolute flex items-center justify-between gap-2 top-0 left-0 w-full h-auto p-4 z-20">
                    <div>
                      <h3 className="font-semibold text-white capitalize text-xl">
                        {category.name}
                      </h3>
                      <span className="block mt-1 font-medium text-sm text-white">
                        Starting From : {category.startingFrom}
                      </span>
                    </div>
                    <div className="shop-btn lg:block hidden">
                        <button className="button-1 p-3 !rounded-full group-hover:!bg-[#4A3A2A] cursor-pointer"><MoveRight className="-rotate-45 group-hover:rotate-0" /></button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
