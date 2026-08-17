import Link from "next/link";
import { BestSellerSection } from "@/lib/types";
import ProductCard from "../product/ProductCard";
import {ChevronRight } from "lucide-react";

export default function BestSeller({
  content,
}: {
  content: BestSellerSection;
}) {
  if (!content?.products?.length) return null;

  return (
    <section className="best-seller md:py-24 py-8 bg-[#ffffff] section-border">
      <div className="container">
        {/* Header */}
        <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 items-center md:gap-2 gap-4 md:mb-10 mb-5">
          <div className="col md:text-start text-center">
            <p className="text-[10px] text-[rgb(153,161,78)] tracking-[0.25em] uppercase mb-2 font-medium">
              Stock Favorites
            </p>
            <h2 className="sm:text-6xl text-2xl font-medium  mb-2 new-heading">
              {content.sectionTitle}
            </h2>
            {/* <p className="md:text-base text-sm text-dark opacity-95 ">
              {content.sectionSubtitle}
            </p> */}
          </div>
          <div className="flex md:justify-end justify-center">
            <Link href="/product/">
              <button className="flex items-center gap-x-2 cursor-pointer text-xs font-semibold border-b-2 border-[#d8c06a] pb-1 tracking-widest uppercase">
                  View All Products
                  <span>
                    <ChevronRight size={16} />
                  </span>
                </button>
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {content.products.map((product) => (
            <ProductCard key={product.product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
