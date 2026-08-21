"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Category, FooterDetail } from "@/lib/types";
import AuthMenu from "./AuthMenu";
import {
  ChevronDown,
  ChevronRight,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import Logo from "../../public/media/logo-small.png";
import WishlistIcon from "./WishlistIcon";
import MobileSidebar from "./header/MobileSidebar";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useDebounce } from "@/hooks/useDebounce";
import SearchDropdown from "./header/SearchDropdown";
import MobileSearchPopup from "./header/MobileSearchPopup";
import { useCart } from "@/context/CartContext";
import { Truck } from "lucide-react";
import UserDropdown from "./UserDropdown";

const menu = [
  {
    name: "Porcelain Planks",
    slug: "porcelain-planks",
    aboutTitle: "About Porcelain Planks",
    about:
      "Porcelain planks are a versatile and durable flooring option that mimics the look of natural wood or stone.",
    items: [
      {
        name: "County Anthracite Porcelain",
        href: "product/county-anthracite-porcelain/",
      },
      {
        name: "County Lgy Porcelain",
        href: "product/county-lgy-porcelain/",
      },
    ],
  },
  {
    name: "Outdoor Porcelain Tiles",
    slug: "outdoor-porcelain-tiles",
    aboutTitle: "About Outdoor Porcelain",
    about:
      "Modern porcelain paving with exceptional durability and low maintenance.",
    items: [
      {
        name: "Kandla Grey Porcelain",
        href: "product/kandla-grey-porcelain/",
      },
      {
        name: "County Gris Porcelain",
        href: "product/county-gris-porcelain/",
      },
      {
        name: "Anthracite Grey Porcelain",
        href: "product/anthracite-grey-porcelain/",
      },
      {
        name: "Hammerstone Beige Porcelain",
        href: "product/hammerstone-beige-porcelain/",
      },
    ],
  },
  {
    name: "Cobblestone Paving",
    slug: "cobblestone-paving",
    aboutTitle: "About Cobblestone Paving",
    about:
      "Durable cobblestone paving ideal for creating beautiful outdoor spaces.",
    items: [
      {
        name: "Kandla Grey Cobblestone Paving",
        href: "product/kandla-grey-cobblestone-paving/",
      },
      {
        name: "Raj Green Cobblestone Paving",
        href: "product/raj-green-cobblestone-paving/",
      },
      {
        name: "Black Limestone Cobblestone Paving",
        href: "product/black-limestone-cobblestone-paving/",
      },
      {
        name: "Yellow Limestone Cobblestone Paving",
        href: "product/yellow-limestone-cobblestone-paving/",
      },
    ],
  },
  {
    name: "Sandstone Paving",
    slug: "sandstone-paving",
    aboutTitle: "About Sandstone",
    about:
      "Natural split texture, ideal for garden paths, patios and landscaping projects.",
    items: [
      {
        name: "Indian Sandstone",
        href: "/product/indian-sandstone",
      },
      {
        name: "Raj Green",
        href: "/product/raj-green",
      },
      {
        name: "Kandla Grey",
        href: "/product/kandla-grey",
      },
      {
        name: "Mint Fossil",
        href: "/product/mint-fossil",
      },
      {
        name: "Camel Dust",
        href: "/product/camel-dust",
      },
    ],
  },
];

export default function Header({
  categories,
  footerDetail,
}: {
  categories: Category[];
  footerDetail: FooterDetail | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuthUser();
  
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const [results, setResults] = useState({ categories: [], products: [] });

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { totalQuantity } = useCart();
  
  const [headerVisible, setHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (debounced.length < 2) {
      setResults({ categories: [], products: [] });
      return;
    }

    fetch(`/api/search?q=${debounced}`)
      .then((r) => r.json())
      .then(setResults);
  }, [debounced]);

  useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    const headerHeight = headerRef.current?.offsetHeight ?? 0;

    // Always show header when we're near the top
    if (currentScrollY <= headerHeight) {
      setHeaderVisible(true);
      lastScrollY.current = currentScrollY;
      return;
    }

    // Scrolling down → hide
    if (currentScrollY > lastScrollY.current) {
      setHeaderVisible(false);
    }

    // Scrolling up → show
    else if (currentScrollY < lastScrollY.current) {
      setHeaderVisible(true);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    window.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("keydown", esc);
    };
  }, []);

  return (
    <>
      <header
  ref={headerRef}
  className={`fixed z-50 w-full bg-white font-sans shadow-sm transition-transform duration-300 ease-in-out ${
    headerVisible ? "translate-y-0" : "-translate-y-full"
  }`}
>
        <div className="top-header bg-dark-n py-2 lg:block hidden">
          <div className="container">
            <div className="flex text-xs">
              <div className="lg:w-1/3 w-5/12 gap-x-1.5 flex">
                <Truck size={14} color="#D8C06A" />
                <span className="text-white">Free delivery in UK mainland</span>
              </div>
              <div className="lg:w-2/3 w-7/12 gap-x-2 flex justify-end">
                <Link
                  className="flex items-center gap-x-2 text-gray-300 hover:text-white"
                  href={`mailto:${footerDetail?.companyEmails[0].email}`}
                >
                  <span>
                    <Mail size={14} />
                  </span>
                  {footerDetail?.companyEmails[0].email}
                </Link>
                <span className="text-white"> | </span>
                <Link
                  className="flex items-center gap-x-2 text-gray-300 hover:text-white"
                  href={`tel:${footerDetail?.companyPhoneNumbers[0].phone}`}
                >
                  <span>
                    <Phone size={14} />
                  </span>
                  {footerDetail?.companyPhoneNumbers[0].phone}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex py-2 items-center justify-between">
            <div className="md:w-3/12 w-6/12 flex items-center">
              <Link href="/" className="flex items-center gap-x-1">
                <div className="relative lg:w-[75px] lg:h-[70px] w-[50px] h-[50px]">
                  <Image
                    src={Logo}
                    alt="Logo"
                    fill
                    objectFit="contain"
                    priority
                  />
                </div>
                <div className="">
                  <span className="block serif text-xl text-[rgb(38,42,24)] tracking-tight font-medium">
                    Stonecera
                  </span>
                  <span className="block lg:text-[9px] sm:text-[7px] text-[5px] tracking-[0.2em] uppercase text-[rgb(74,85,48)] font-sans leading-none font-semibold">
                    Natural Stone Specialists
                  </span>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex md:w-6/12 justify-center items-center gap-4">
              <div
                ref={ref}
                className="relative xl:w-2/3 md:w-5/6 w-full px-3 py-2 gap-x-2 flex justify-center items-center bg-[#f9f7f3] border-[#262A1833] border-[1px]"
              >
                <Search size={18} color="#4a5530" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  placeholder="Search products or categories..."
                  className="text-sm w-full"
                />

                <SearchDropdown
                  open={open}
                  results={results}
                  onClose={() => setOpen(false)}
                />
              </div>
            </div>

            <div className="md:w-3/12 w-6/12 flex justify-end items-center md:gap-x-4 gap-x-2">
              <button
                aria-label="Search"
                onClick={() => setMobileSearchOpen(true)}
                className="md:hidden flex flex-col items-center cursor-pointer"
              >
                <Search size={18} color="#262a18" />
                <span className="sm:block hidden text-[10px]">Search</span>
              </button>
              <WishlistIcon />
              <Link aria-label="Cart" href={"/cart/"} className="relative">
                <ShoppingCart size={18} color="#262a18" />
                <span className="sm:block hidden text-[10px]">Cart</span>
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d8c06a] text-white text-xs px-1.5 rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              {!loading &&
                (user ? (
                  <AuthMenu user={user} />
                ) : (
                  <div className="hidden lg:flex items-center gap-3">
                    <UserDropdown />
                  </div>
                ))}

              <div
                className="menu-icon flex flex-col lg:hidden items-center cursor-pointer"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={18} color="#262a18" />
                <span className="sm:block text-[10px] hidden">Menu</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-dark-n lg:block hidden">
          <div className="container flex justify-between">
            <ul className="flex xl:gap-x-4 gap-x-2 items-center">
              {menu.map((category) => (
                <li key={category.slug} className="relative group">
                  <Link
                    href={`/product-category/${category.slug}`}
                    className="flex items-center gap-1 py-3 text-sm text-white hover:text-[#c9a74e] transition-colors h-11 text-stone-cream font-sans font-medium tracking-wide hover:text-ochre"
                  >
                    {category.name}

                    <ChevronDown
                      size={14}
                      color="#D8C06A"
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </Link>

                  {category.items.length > 0 && (
                    <div className="absolute left-0 top-full opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 bg-white shadow-xl border-[#262A1833] w-[650px] z-50">
                      <div className="grid grid-cols-[280px_1fr]">
                        {/* Left */}
                        <div className="border-r border-[#262A1833] p-6">
                          <h4 className="mb-3 text-xs uppercase tracking-[3px] font-medium text-[#c9a74e]">
                            MATERIAL TYPES
                          </h4>

                          <ul className="text-sm text-gray-700">
                            {category.items.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className="flex justify-between group border-b border-[#262A1833] py-2 hover:text-[#c9a74e] transition-colors"
                                >
                                  {item.name}
                                  <span className="inline-block group-hover:opacity-100 opacity-0 transition-opacity">
                                    <ChevronRight
                                      size={16}
                                      strokeWidth={1.6}
                                      color="#c9a74e"
                                    />
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right */}

                        <div className="p-6 bg-[#f8f3eae5]">
                          <h4 className="mb-4 text-xs uppercase tracking-[3px] text-[#c9a74e] font-medium">
                            {category.aboutTitle}
                          </h4>

                          <p className="text-sm text-gray-700 leading-6">
                            {category.about}
                          </p>

                          <Link
                            href={`/product-category/${category.slug}`}
                            className="inline-block mt-10 border-b border-black pb-1 hover:text-[#c9a74e]"
                          >
                            Browse all {category.name} →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <ul className="flex xl:gap-x-5 gap-x-3  items-center text-[rgb(244,240,233)]">
              <li>
                <Link
                  href="/products/"
                  className="block py-3 text-sm hover:text-[#c9a74e] opacity-75 hover:opacity-100 hover:text-ochre transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/product-category/"
                  className="block py-3 text-sm hover:text-[#c9a74e] opacity-75 hover:opacity-100 hover:text-ochre transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs/"
                  className="block py-3 text-sm hover:text-[#c9a74e] opacity-75 hover:opacity-100 hover:text-ochre transition-colors"
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  href="/about-us/"
                  className="block py-3 text-sm hover:text-[#c9a74e] opacity-75 hover:opacity-100 hover:text-ochre transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us/"
                  className="block py-1 px-3 text-sm text-[#262A18] cursor-pointer bg-[#d8c06a]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          categories={categories}
        />
        <MobileSearchPopup
          open={mobileSearchOpen}
          query={query}
          setQuery={setQuery}
          results={results}
          onClose={() => {
            setMobileSearchOpen(false);
            setQuery("");
          }}
        />
      </header>
    </>
  );
}
