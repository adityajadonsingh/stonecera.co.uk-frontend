"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Category, FooterDetail } from "@/lib/types";
import AuthMenu from "./AuthMenu";
import { Mail, Menu, Phone, Search, ShoppingCart } from "lucide-react";
import Logo from "../../public/media/logo.png";
import WishlistIcon from "./WishlistIcon";
import MobileSidebar from "./header/MobileSidebar";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function Header({
  categories,
  footerDetail,
}: {
  categories: Category[];
  footerDetail: FooterDetail | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuthUser();

  return (
    <>
      <header className="bg-white fixed w-full z-50 shadow-md">
        <div className="top-header bg-skin py-2 lg:block hidden">
          <div className="container">
            <div className="flex font-medium text-sm">
              <div className="lg:w-1/3 w-5/12 gap-x-1.5 flex">
                <Link
                  className="flex items-center gap-x-1"
                  href={`mailto:${footerDetail?.companyEmails[0].email}`}
                >
                  <span>
                    <Mail size={16} />
                  </span>
                  {footerDetail?.companyEmails[0].email}
                </Link>
                <span> | </span>
                <Link
                  className="flex items-center gap-x-1"
                  href={`tel:${footerDetail?.companyPhoneNumbers[0].phone}`}
                >
                  <span>
                    <Phone size={16} />
                  </span>
                  {footerDetail?.companyPhoneNumbers[0].phone}
                </Link>
              </div>
              <div className="lg:w-2/3 w-7/12 gap-x-2 capitalize flex justify-end">
                <Link href={"/about-us/"}>About Us</Link>
                <span>|</span>
                <Link href={"/product-category/"}>Categories</Link>
                <span>|</span>
                <Link href={"/products/"}>Products</Link>
                <span>|</span>
                <Link href={"/blogs/"}>Blogs</Link>
                <span>|</span>
                <Link href={"/contact-us/"}>Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            <div className="w-3/12 flex items-center">
              <Link href="/" className="flex items-center">
                <Image src={Logo} alt="Logo" width={70} height={52} priority />
              </Link>
            </div>

            <div className="w-6/12 items-center gap-4">
              <div className="w-full justify-center flex">
                <input
                  type="text"
                  placeholder="Search Products..."
                  className="bg-skin px-3 py-1 rounded-l-sm "
                />
                <button className="px-3 rounded-r-sm button-logo-1">
                  <Search size={18} />
                </button>
              </div>
            </div>

            <div className="w-3/12 flex justify-end items-center gap-x-4">
              <WishlistIcon />
              <Link href={"/cart/"}>
                <ShoppingCart size={24} color="#bd7e40" />
              </Link>
              {!loading &&
                (user ? (
                  <AuthMenu user={user} />
                ) : (
                  <div className="hidden lg:flex items-center gap-3">
                    <Link
                      href="/login"
                      className="text-sm px-3 py-2 rounded bg-[#F7F3EB] hover:bg-[#4A3A2A] text-[#4A3A2A] hover:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="text-sm px-3 py-2 button-logo-1 text-white rounded hover:bg-gray-900"
                    >
                      Register
                    </Link>
                  </div>
                ))}

              <div
                className="menu-icon lg:hidden block cursor-pointer"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} color="#bd7e40" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-dark py-2 lg:block hidden">
          <div className="container">
            <ul className="flex mx-auto justify-between gap-x-3 cat-header">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/product-category/${category.slug}`}
                    className="text-sm font-medium"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          categories={categories}
        />
      </header>
    </>
  );
}
