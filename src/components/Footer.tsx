import { Category, FooterDetail } from "@/lib/types";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Visa from "../../public/media/visa.png";
import Mastercard from "../../public/media/mastercard.png";
import Amex from "../../public/media/amex.png";
import ApplePay from "../../public/media/apple-pay.png";
import Skrill from "../../public/media/skrill.png";

export default function Footer({
  categories,
  footerDetail,
}: {
  categories: Category[];
  footerDetail: FooterDetail | null;
}) {
  return (
    <>
      <footer className="py-16 bg-dark">
        <div className="container">
          <div className="grid grid-cols-4 mb-5">
            <div className="footer-widget">
              <h4 className="text-white text-xl font-semibold mb-4">
                Customer Service
              </h4>
              <ul className="flex flex-col mb-5 gap-1">
                <li>
                  <Link href="/contact-us/">Contact Us</Link>
                </li>
                <li>
                  <Link href="/shipping-policy/">Shipping Policy</Link>
                </li>
                <li>
                  <Link href="/cancellations-and-refunds/">
                    Cancellations & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/faqs/">FAQ&apos;s</Link>
                </li>
              </ul>
              <ul className="social flex gap-4">
                {footerDetail?.facebookLink && (
                  <li className="w-[40px] h-[40px] bg-[#dfdfdf6e] rounded-full flex items-center justify-center">
                    <Link href={footerDetail?.facebookLink}>
                      <Facebook size={16} />
                    </Link>
                  </li>
                )}
                {footerDetail?.twitterLink && (
                  <li className="w-[40px] h-[40px] bg-[#dfdfdf6e] rounded-full flex items-center justify-center">
                    <Link href={footerDetail?.twitterLink}>
                      <Twitter size={16} />
                    </Link>
                  </li>
                )}
                {footerDetail?.instagramLink && (
                  <li className="w-[40px] h-[40px] bg-[#dfdfdf6e] rounded-full flex items-center justify-center">
                    <Link href={footerDetail?.instagramLink}>
                      <Instagram size={16} />
                    </Link>
                  </li>
                )}
                {footerDetail?.linkedinLink && (
                  <li className="w-[40px] h-[40px] bg-[#dfdfdf6e] rounded-full flex items-center justify-center">
                    <Link href={footerDetail?.linkedinLink}>
                      <Linkedin size={16} />
                    </Link>
                  </li>
                )}
                {/* {
                            footerDetail?.pinterestLink && <li className="w-[40px] h-[40px] bg-[#dfdfdfce] rounded-full flex items-center justify-center"><Link href={footerDetail?.pinterestLink}>Pinterest</Link></li>
                        } */}
              </ul>
            </div>
            <div className="footer-widget">
              <h4 className="text-white text-xl font-semibold mb-4">
                Stonecera
              </h4>
              <ul className="flex flex-col gap-1">
                <li>
                  <Link href="/product-category/">Product Category</Link>
                </li>
                <li>
                  <Link href="/product-catalogue/">Product Catalogue</Link>
                </li>
                <li>
                  <Link href="/about-us/">About Us</Link>
                </li>
                <li>
                  <Link href="/blogs/">Blogs</Link>
                </li>
              </ul>
            </div>
            <div className="footer-widget">
              <h4 className="text-white text-xl font-semibold mb-4">
                Categories
              </h4>
              <ul className="flex flex-col gap-1">
                {categories.map((category, i) => (
                  <li key={`footer-category-${i}`}>
                    <Link href={`/product-category/${category.slug}/`}>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-widget">
              <h4 className="text-white text-xl font-semibold mb-4">
                Contact Us
              </h4>
              <ul className="flex flex-col gap-1">
                <li className="flex items-center gap-x-2">
                  <span className="w-8 h-8 bg-gray-50/30 rounded-full flex items-center justify-center">
                    <Phone size={14} />
                  </span>
                  <Link href="tel:">
                    {footerDetail?.companyPhoneNumbers[0].phone}
                  </Link>
                </li>
                <li className="flex items-center gap-x-2">
                  <span className="w-8 h-8 bg-gray-50/30 rounded-full flex items-center justify-center">
                    <Mail size={14} />
                  </span>
                  <Link href="mailto:">
                    {footerDetail?.companyEmails[0].email}
                  </Link>
                </li>
                <li className="flex flex-wrap gap-x-2">
                  <span className="w-8 h-8 bg-gray-50/30 rounded-full flex items-center justify-center">
                    <MapPin size={14} />
                  </span>
                  <span>
                    {footerDetail?.companyAddress?.address},<br />
                    {footerDetail?.companyAddress?.city},{" "}
                    {footerDetail?.companyAddress?.pincode}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_0.5fr]">
            <div>
              <ul className="flex gap-6 mb-5">
                <li className="">© 2026 Stonecera. All Rights Reserved.</li>
                <li>
                  <Link href="/privacy-policy/">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-and-conditions/">Terms of use</Link>
                </li>
                <li>
                  <Link href="/cookie-policy/">Cookie Policy</Link>
                </li>
              </ul>
              <div className="flex w-fit gap-x-4 py-1 px-4 bg-white/10">
                <Image src={Visa} alt="Visa" width={44} height={44} />
                <Image
                  src={Mastercard}
                  alt="Mastercard"
                  width={44}
                  height={44}
                />
                <Image src={Amex} alt="Amex" width={44} height={44} />
                <Image
                  src={ApplePay}
                  alt="Apple Pay"
                  width={44}
                  height={44}
                  className="object-contain"
                />
                <Image
                  src={Skrill}
                  alt="Skrill"
                  width={44}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="newsletter">
              <h2 className="text-xl text-right font-semibold mb-3">
                Subscribe to our Newsletter
              </h2>
              <p className="text-right">
                Stay ahead of the curve with our insights on stones. We&apos;re your
                gateway to understanding what&apos;s next.
              </p>
              <div className="flex mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded-l-md bg-[#4c433191] w-full"
                />
                <button className="bg-[#4c4331] text-white px-4 rounded-r-md cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
