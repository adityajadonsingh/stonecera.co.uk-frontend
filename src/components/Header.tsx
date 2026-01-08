import Link from "next/link";
import Image from "next/image";
import type { Category, FooterDetail } from "@/lib/types";
import AuthMenu from "./AuthMenu";
import { Mail, Phone, Search, ShoppingCart } from "lucide-react";
import Logo from "../../public/media/logo.png";
import WishlistIcon from "./WishlistIcon";

export default async function Header({
  categories,
  footerDetail,
}: {
  categories: Category[];
  footerDetail: FooterDetail | null;
}) {
  return (
    <>
      <header className="bg-white fixed w-full z-50 shadow-md">
        <div className="top-header bg-skin py-2">
          <div className="container">
            <div className="flex font-medium text-sm">
              <div className="w-1/3 gap-x-1.5 flex">
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
              <div className="w-2/3 gap-x-2 capitalize flex justify-end">
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

            <div className="w-3/12 flex justify-end items-center gap-x-2">
              {/* <Link href={"/wishlist/"} className="mr-1">
                <Heart size={24} color="#bd7e40" />
              </Link> */}

              <WishlistIcon />
              <Link href={"/cart/"}>
                <ShoppingCart size={24} color="#bd7e40" />
              </Link>
              <AuthMenu />
            </div>
          </div>
        </div>
        <div className="bg-dark py-2">
          <ul className="flex mx-auto justify-evenly w-10/12 gap-x-3">
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
      </header>
    </>
  );
}
