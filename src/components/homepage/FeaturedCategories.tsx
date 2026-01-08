import Link from "next/link";
import Image from "next/image";
import { FeaturedCategoriesSection } from "@/lib/types";
import { MoveRight } from "lucide-react";

export default function FeaturedCategories({
  content,
}: {
  content: FeaturedCategoriesSection;
}) {
  return (
    <>
      <section className="featuredCategory py-16">
        <div className="container">
          <div className="grid grid-cols-[2fr_1fr] items-center gap-2 mb-10">
            <div className="col">
              <h2 className="text-3xl heading font-bold  mb-2">
                {content.sectionTitle}
              </h2>
              <p className="text-lg text-dark opacity-95 ">
                {content.sectionSubtitle}
              </p>
            </div>
            <div className="flex justify-end">
              <Link href={"/product-category/"}>
                <button className="button-1 py-3 px-4">
                  View All Categories
                </button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
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
                        <button className="button-1 p-3 !rounded-full group-hover:!bg-[#4A3A2A]"><MoveRight className="-rotate-45 group-hover:rotate-0" /></button>
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
