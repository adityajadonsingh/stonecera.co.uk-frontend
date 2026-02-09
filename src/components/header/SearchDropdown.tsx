"use client";

import Link from "next/link";

interface Props {
  open: boolean;
  results: {
    categories: { name: string; slug: string }[];
    products: { name: string; slug: string }[];
  };
  onClose: () => void;
}

export default function SearchDropdown({ open, results }: Props) {
  if (!open) return null;

  const { categories, products } = results;

  if (!categories.length && !products.length) {
    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-1 p-3 text-sm text-gray-400">
        No results found
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded mt-1 max-h-[300px] overflow-y-auto z-50">
      {categories.length > 0 && (
        <div >
          <div className="bg-skin p-3">
            <p className="font-semibold">Categories</p>
          </div>
          <ul className="space-y-2 p-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/product-category/${c.slug}`}
                  className="block hover:text-[#bd7e40]"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {products.length > 0 && (
        <div >
          <div className="bg-skin p-3">
            <p className="font-semibold">Products</p>
          </div>
          <ul className="space-y-2 p-3">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/product/${p.slug}`}
                  className="block hover:text-[#bd7e40]"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
