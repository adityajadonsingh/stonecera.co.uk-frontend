
"use client";

import Link from "next/link";

interface Props {
  open: boolean;
  results: {
    categories: { name: string; slug: string }[];
    products: { name: string; slug: string }[];
  };
  onResultClick: () => void;
}

export default function SearchDropdown({ open, results, onResultClick }: Props) {
  if (!open) return null;

  const { categories, products } = results;

  if (!categories.length && !products.length) {
    return (
      <div className="absolute top-full left-0 mt-2 w-full rounded-lg bg-white p-3 text-sm text-gray-500 shadow-lg">
        No results found
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 z-50 mt-2 max-h-[300px] w-full overflow-y-auto rounded-lg bg-white shadow-lg">
      {categories.length > 0 && (
        <div>
          <div className="bg-skin p-3">
            <p className="font-semibold">Categories</p>
          </div>

          <ul className="space-y-2 p-3 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/product-category/${category.slug}`}
                  onClick={onResultClick}
                  className="block hover:text-[#bd7e40]"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {products.length > 0 && (
        <div>
          <div className="bg-skin p-3">
            <p className="font-semibold">Products</p>
          </div>

          <ul className="space-y-2 p-3 text-sm">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onResultClick}
                  className="block hover:text-[#bd7e40]"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
