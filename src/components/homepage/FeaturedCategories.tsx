import Link from "next/link";
import Image from "next/image";
import { FeaturedCategoriesSection } from "@/lib/types";
import { ChevronRight } from "lucide-react";

export default function FeaturedCategories({
  content,
}: {
  content: FeaturedCategoriesSection;
}) {
  return (
    <>
      <section className="featuredCategory md:py-32 py-8 bg-[#f9f7f3] section-border">
        <div className="container">
          <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 items-center md:gap-2 gap-4 md:mb-10 mb-5">
            <div className="col md:text-start text-center">
              <p className="text-[10px] text-[rgb(153,161,78)] tracking-[0.25em] uppercase mb-2 font-medium">
                The Collection
              </p>
              <h2 className="sm:text-6xl text-2xl font-medium  mb-2 new-heading">
                {content.sectionTitle}
              </h2>
              {/* <p className="md:text-base text-sm text-dark opacity-95 ">
                {content.sectionSubtitle}
              </p> */}
            </div>
            <div className="flex md:justify-end justify-center">
              <Link href={"/product-category/"}>
                <button className="flex items-center gap-x-2 cursor-pointer text-xs font-semibold border-b-2 border-[#d8c06a] pb-1 tracking-widest uppercase">
                  View All
                  <span>
                    <ChevronRight size={16} />
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-4 grid-cols-1 md:gap-5 gap-2">
            {content.categories.map((category, i) => (
              <Link
                className="group"
                href={`/product-category/${category.slug}/`}
                key={`featured-category-${i}`}
              >
                <div className="w-full h-[410px] relative overflow-hidden rounded-[1px]">
                  {category.categoryDiscount > 0 && (
                    <span className="absolute">
                      {category.categoryDiscount}
                    </span>
                  )}
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}${category.images[0].url}`}
                    alt={category.images[0].alt || category.name}
                    fill
                    className="object-cover rounded-[1px] transition-transform duration-800 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(38, 42, 24, 0.85) 0%, rgba(38, 42, 24, 0.1) 60%)",
                    }}
                  ></div>

                  <div className="absolute flex items-center justify-between gap-2 bottom-0 left-0 w-full h-auto p-5 z-20">
                    <div>
                      <span className="text-[rgb(216,192,106)] mb-3 text-xs font-medium">
                        {category.productCount} PRODUCTS
                      </span>
                      <h3 className="font-medium text-white capitalize text-2xl">
                        {category.name}
                      </h3>
                      <span className="block   text-sm text-[rgb(245,240,232)]/65">
                        {category.sub_heading}
                      </span>
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
