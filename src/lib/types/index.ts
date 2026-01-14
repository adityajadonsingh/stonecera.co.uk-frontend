// @/lib/types/index.ts

export interface ImageAttributes {
  id: number;
  url: string;
  alt: string;
}
export interface ProductVariation {
  id: number;
  SKU: string;
  Thickness: string;
  Size: string;
  Finish: string;
  PackSize: number;
  Pcs: number;
  Stock: number;
  ColorTone: string;
  Price: number;
  Per_m2: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  bannerImg: ImageAttributes;
  categoryDiscount: number;
  short_description: string;
  images: ImageAttributes[];
  products: CategoryProduct[];
  totalProducts: number;
  filterCounts?: FilterCounts;
  startingFrom?: number;
}

export interface CategoryProduct {
  variations: ProductVariation[]; 
  selectedVariation: ProductVariation;
  product: Product;
  priceBeforeDiscount?: {
    Per_m2: number;
    Price: number;
  } | null;
}

export interface FilterCounts {
  price: Record<string, number>;
  colorTone: Record<string, number>;
  finish: Record<string, number>;
  thickness: Record<string, number>;
  size: Record<string, number>;
  pcs: Record<string, number>;
  packSize: Record<string, number>;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  productDiscount: number;
  categoryDiscount: number;
  images: ImageAttributes[];
  image: {
    url: string;
    alt: string;
  } | null;
  variations: ProductVariation[];
  category: { name: string; slug: string; categoryDiscount: number };
  priceBeforeDiscount?: {
    Per_m2: number;
    Price: number;
  } | null;
}

export interface UserAttributes {
  id?: number;
  username?: string;
  email?: string;
}

export type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

export type StrapiCollectionResponse<T> = {
  data: StrapiEntity<T>[];
  meta?: unknown;
};

export type StrapiSingleResponse<T> = {
  data: StrapiEntity<T> | null;
  meta?: unknown;
};

export interface CartAttributes {
  uuid?: number | string;
  quantity: number;
  unit_price?: number | null;
  product?: StrapiEntity<Product> | null;
  metadata?: Record<string, unknown> | null;
  user?: StrapiEntity<UserAttributes> | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartMetadata {
  productImage?: string;
  productName?: string;
  sku?: string;
  variation: ProductVariation;
}

export type CartItem = StrapiEntity<CartAttributes>;
export type CartCollectionResponse = StrapiCollectionResponse<CartAttributes>;

export interface AddToCartBody {
  product: number | string;
  variation_id: number;
  quantity: number;
}

export interface UpdateCartBody {
  quantity?: number;
  unit_price?: number;
  metadata?: Record<string, unknown> | null;
}
export interface Address {
  id: number;
  label?: string;
  address?: string;
  city?: string;
  pincode?: string;
}
export interface UserDetails {
  id?: number;
  firstName: string | null;
  lastName: string | null;
  profileImage?: ImageAttributes | null;
  phoneNumbers?: Array<{ phone?: string }>;
  savedAddresses: Address[];
}

export interface AppUser {
  id: number;
  username?: string | null;
  email?: string | null;
  userDetails?: UserDetails | null;
}

export interface AddressInput {
  id: number;
  address: string;
  city: string;
  pincode: string;
  label?: string;
}

export interface CheckoutItem {
  items: {
    product: number;
    variation_id: number;
    quantity: number;
    unit_price: number;
  }[];
  shipping: {
    address: AddressInput;
    method: string;
    shippingCost: number;
    tailLift: boolean;
  };
  totals: {
    cartSubtotal: number;
    shippingCost: number;
    tailLift: number;
    total: number;
    itemPrices: {
      variation_id: number;
      checkoutPrice: number;
    }[];
  };
}

export type PhoneNumber = {
  id: number;
  phone?: string;
  label?: string;
};

export type Email = {
  id: number;
  email?: string;
  label?: string;
};

export type FooterDetail = {
  companyPhoneNumbers: PhoneNumber[];
  companyEmails: Email[];
  companyAddress: Address | null;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
  pinterestLink: string;
};

export type Banner = {
  id: number;
  bannerImage: {
    url: string;
    alternativeText?: string;
  };
  heading: string;
  subHeading: string;
  link: string;
};

export interface FeaturedCategoriesSection {
  sectionTitle: string;
  sectionSubtitle: string;
  categories: Category[];
}
export interface PriceGroup {
  Per_m2: number;
  Price: number;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  categoryDiscount: number;
}

export interface BestSellerProduct {
  name: string;
  slug: string;
  productDiscount: number;
  image: {
    url: string;
    alt: string;
  } | null;
  priceAfterDiscount: PriceGroup;
  priceBeforeDiscount: PriceGroup | null;
  category: CategoryInfo | null;
}

export interface BestSellerSection {
  sectionTitle: string;
  sectionSubtitle: string;
  products: BestSellerProduct[];
}
type Review = {
  name: string;
  stars: number;
  review: string;
};
export interface CustomerReviewsSection {
  sectionTitle: string;
  sectionSubtitle: string;
  reviews: Review[];
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  author: string;
  createdOn: string;
  image: ImageAttributes;
}

export type HomepageData = {
  banner: Banner[];
  featuredCategory: FeaturedCategoriesSection;
  bestSeller: BestSellerSection;
  reviews: CustomerReviewsSection;
  blogs: Blog[];
};

export type WishlistItem = number;
