import Link from "next/link";
import { getServerWishlist } from "@/lib/api/getWishlist";
import { Product } from "@/lib/types";
import WishlistClient from "@/components/wishlist/WishlistClient";

export default async function WishlistPage() {
  const items: Product[] = await getServerWishlist();
  return (
    <section className="py-12 bg-[#faf7f3] min-h-[60vh]">
      <div className="container">
        <p className="text-sm text-gray-500 mb-2">
          <Link href="/">Home</Link> / Wishlist
        </p>

        <h1 className="text-3xl font-semibold mb-8">My Wishlist</h1>

        <WishlistClient initialItems={items} />
      </div>
    </section>
  );
}
