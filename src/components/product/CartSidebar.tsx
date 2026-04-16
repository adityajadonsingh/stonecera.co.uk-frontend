"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { items, isCartOpen, closeCart, addToCart, removeFromCart } = useCart();

  const router = useRouter();

  // prevent body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCartOpen]);

  // quantity update
  const updateQty = async (item: any, newQty: number, stock: number) => {
    if (newQty < 1) {
      await removeFromCart(item.variation.id);
      return;
    }

    if (newQty > stock) return;

    await addToCart({
      product: item.product.id,
      variation_id: item.variation.id,
      quantity: newQty - item.quantity, // 🔥 delta update
    });
  };
  // console.log(items);

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div onClick={closeCart} className="fixed inset-0 bg-black/40 z-50" />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-skin z-[9999999999] shadow-xl transition-transform duration-300
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-400">
          <h2 className="text-lg font-semibold flex gap-x-2"><ShoppingCart /> Your Cart ({items.length})</h2>
          <button className="cursor-pointer" onClick={closeCart}>
            <X />
          </button>
        </div>

        {/* Items */}
        <div className="overflow-y-auto h-[calc(100%-140px)] p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            items.map((item) => {
              const stock = item.variation?.stock || 999;

              return (
                <div key={item.id} className="flex gap-3 border-b border-gray-200 pb-3">
                  {/* Image */}
                  <div className="w-16 h-16 relative">
                    <Image
                      src={item.product?.image}
                      alt={item.product?.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {item.product?.name}
                    </div>

                    <div className="text-xs text-gray-500">
                      {item.metadata?.variation?.Size} • {item.metadata?.variation?.Thickness}
                    </div>

                    <div className="text-sm font-semibold mt-1">
                      £{item.unit_price}
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQty(item, item.quantity - 1, stock)
                        }
                        className="w-7 h-7 bg-gray-200 rounded cursor-pointer hover:bg-[#4a3a2a] hover:text-white"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQty(item, item.quantity + 1, stock)
                        }
                        className="w-7 h-7 bg-gray-200 rounded cursor-pointer hover:bg-[#4a3a2a] hover:text-white"
                        disabled={item.quantity >= stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 ">
          <button
            onClick={() => {
              closeCart();
              router.push("/cart");
            }}
            className="w-full button-1 cursor-pointer text-white py-3 rounded"
          >
            Go to Cart
          </button>
        </div>
      </div>
    </>
  );
}
