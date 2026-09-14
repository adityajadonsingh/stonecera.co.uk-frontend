import Link from "next/link";
import { getServerWishlist } from "@/lib/api/getWishlist";
import { CategoryProduct } from "@/lib/types";
import WishlistClient from "@/components/wishlist/WishlistClient";
import Breadcrum from "@/components/Breadcrum";
import { Heart } from "lucide-react";

export default async function WishlistPage() {
  const items: CategoryProduct[] = await getServerWishlist();
  return (
    <>
      <Breadcrum breadcrum={[{ pageName: "Wishlist", pageUrl: "/wishlist" }]} />
      <section className="py-12 bg-[#f9f7f3] min-h-[60vh]">
        <div className="container">
          <div className="flex gap-3 items-center mb-8">
            <Heart size={35} strokeWidth={1.8} color="#99a14e" />
            <h1 className="lg:text-4xl md:text-3xl text-2xl text-[#262a18] font-medium ">My Wishlist</h1>
          </div>

          <WishlistClient initialItems={items} />
        </div>
      </section>
    </>
  );
}
