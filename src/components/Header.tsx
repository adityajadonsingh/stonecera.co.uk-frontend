"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CategoryWithProducts, FooterDetail } from "@/lib/types";
import AuthMenu from "./AuthMenu";
import {
  ChevronDown,
  ChevronRight,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
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

type SearchResults = {
  categories: { name: string; slug: string }[];
  products: { name: string; slug: string }[];
};

export default function Header({
  categories,
  footerDetail,
}: {
  categories: CategoryWithProducts[];
  footerDetail: FooterDetail | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuthUser();

  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResults>({
    categories: [],
    products: [],
  });

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { totalQuantity } = useCart();

  const [headerVisible, setHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
  });

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
              <ul className="flex xl:gap-x-5 gap-x-3 lg:text-base text-sm items-center text-[rgb(38,42,24)]">
                <li>
                  <Link
                    href="/products/"
                    className="block py-3 font-semibold hover:text-[#c9a74e] opacity-75 hover:opacity-100 hover:text-ochre transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/product-category/"
                    className="block py-3 font-semibold hover:text-[#c9a74e] opacity-75 hover:opacity-100 hover:text-ochre transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/product-catalogue/"
                    className="block py-3 font-semibold hover:text-[#c9a74e] opacity-75 hover:opacity-100 hover:text-ochre transition-colors"
                  >
                    Catalogues
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs/"
                    className="block py-3 font-semibold hover:text-[#c9a74e] opacity-75 hover:opacity-100 hover:text-ochre transition-colors"
                  >
                    Blogs
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact-us/"
                    className="block py-3 font-semibold hover:text-[#c9a74e] opacity-75 hover:opacity-100 hover:text-ochre transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
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
              {/* Desktop Search */}
              <div ref={ref} className="relative hidden md:block">
                <button
                  type="button"
                  aria-label="Open search"
                  aria-expanded={open}
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Search size={18} color="#262a18" />
                  <span className="sm:block hidden text-[10px]">Search</span>
                </button>

                {open && (
                  <div className="absolute right-0 top-full z-[60] mt-4 w-[min(520px,calc(100vw-32px))] rounded-xl border border-[#262A1833] bg-white p-3 shadow-xl">
                    {/* Search input and button */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setOpen(true);
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="search"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setOpen(true);
                        }}
                        onFocus={() => setOpen(true)}
                        placeholder="Search paving — colour, size, finish..."
                        className="min-w-0 flex-1 rounded-full border border-[#4a5530] px-4 py-3 text-sm text-gray-800 outline-none focus:ring-1 focus:ring-[#4a5530]"
                        autoFocus
                      />

                      <button
                        type="submit"
                        className="shrink-0 rounded-full bg-[#3f6255] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#304c41]"
                      >
                        Search
                      </button>
                    </form>

                    {/* Search results */}
                    {query.trim().length >= 2 && (
                      <div className="relative">
                        <SearchDropdown
                          open={open}
                          results={results}
                          onResultClick={() => {
                            setOpen(false);
                            setQuery("");
                            setResults({ categories: [], products: [] });
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
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
          <div className="container">
            <ul
              className="flex xl:gap-x-4 gap-x-2 items-center justify-between px-5"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {categories.map((category) => (
                <li
                  key={category.slug}
                  className="relative group"
                  onMouseEnter={(event) => {
                    const dropdown =
                      event.currentTarget.querySelector<HTMLDivElement>(
                        "[data-category-dropdown]",
                      );

                    const content = dropdown?.querySelector<HTMLDivElement>(
                      "[data-dropdown-content]",
                    );

                    if (!dropdown || !content) {
                      setActiveDropdown(null);
                      return;
                    }

                    const categoryRect =
                      event.currentTarget.getBoundingClientRect();

                    const maxAllowedWidth = window.innerWidth - 32;

                    // Measure actual content, not the outer dropdown
                    const dropdownWidth = Math.min(
                      content.scrollWidth,
                      maxAllowedWidth,
                    );

                    const left = Math.max(
                      16,
                      Math.min(
                        categoryRect.left,
                        window.innerWidth - dropdownWidth - 16,
                      ),
                    );

                    setDropdownPosition({
                      left,
                      top: categoryRect.bottom,
                      width: dropdownWidth,
                    });

                    setActiveDropdown(category.slug);
                  }}
                >
                  <Link
                    href={`/product-category/${category.slug}`}
                    className="flex items-center gap-1 py-3 xl:text-sm text-xs text-white hover:text-[#c9a74e] transition-colors h-11 font-sans font-semibold tracking-wide"
                  >
                    {category.name}

                    <ChevronDown
                      size={14}
                      color="#D8C06A"
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </Link>

                  {category.products.length > 0 && (
                    <div
                      data-category-dropdown
                      style={{
                        left: dropdownPosition.left,
                        top: dropdownPosition.top,
                        width: dropdownPosition.width || "max-content",
                      }}
                      className={`
                fixed z-50
                bg-white shadow-xl
                border border-[#262A1833]
                max-w-[calc(100vw-32px)]
                max-h-[calc(100vh-140px)]
                
                transition-[opacity,transform] duration-300

                ${
                  activeDropdown === category.slug
                    ? "visible opacity-100 translate-y-0"
                    : "invisible opacity-0 translate-y-2 pointer-events-none"
                }
              `}
                    >
                      <div className="p-5 md:p-6 w-max" data-dropdown-content>
                        <h4 className="mb-4 text-xs uppercase tracking-[3px] font-medium text-[#c9a74e]">
                          MATERIAL TYPES
                        </h4>

                        <ul
                          className="grid grid-flow-col gap-x-4 text-sm text-gray-700 w-max"
                          style={{
                            gridTemplateRows: "repeat(8, minmax(0, auto))",
                            gridAutoColumns: "minmax(190px, max-content)",
                          }}
                        >
                          {category.products.map((item) => (
                            <li
                              key={item.slug}
                              className="border-b border-[#262A1833]"
                            >
                              <Link
                                href={`/product/${item.slug}/`}
                                className="
                          group/item
                          flex items-center justify-between gap-3
                          py-2 whitespace-nowrap
                          hover:text-[#c9a74e]
                          transition-colors
                        "
                              >
                                <span>{item.name}</span>

                                <ChevronRight
                                  size={15}
                                  strokeWidth={1.6}
                                  color="#c9a74e"
                                  className="
                            shrink-0 opacity-0
                            group-hover/item:opacity-100
                            transition-opacity
                          "
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          categories={categories.map(({ name, slug }) => ({
            name,
            slug,
          }))}
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
