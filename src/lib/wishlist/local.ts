const KEY = "wishlist";

export function getLocalWishlist(): number[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function setLocalWishlist(items: number[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function toggleLocalWishlist(productId: number): number[] {
  const list = new Set(getLocalWishlist());

  list.has(productId) ? list.delete(productId) : list.add(productId);

  const updated = Array.from(list);
  setLocalWishlist(updated);
  return updated;
}

export function clearLocalWishlist() {
  localStorage.removeItem(KEY);
}
