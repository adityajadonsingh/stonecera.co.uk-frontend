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
      <footer className="md:py-16 py-8 bg-dark">
        <div className="container">
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-[1fr_0.9fr_1fr_1.1fr] lg:grid-cols-[1fr_0.7fr_0.9fr_1.2fr] md:grid-cols-[1.4fr_0.7fr_0.9fr] sm:grid-cols-2 sm:gap-y-8 gap-y-4 mb-5">
            <div className="footer-widget">
              <h4 className="text-white text-xl font-semibold sm:mb-4 mb-1">
                Customer Service
              </h4>
              <ul className="flex flex-col mb-5 gap-1 sm:text-base text-sm">
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
              <h4 className="text-white text-xl font-semibold sm:mb-4 mb-1">
                Stonecera
              </h4>
              <ul className="flex flex-col gap-1 sm:text-base text-sm">
                <li>
                  <Link href="/product-category/">Product Category</Link>
                </li>
                <li>
                  <Link href="/product-catalouge/">Product Catalouge</Link>
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
              <h4 className="text-white text-xl font-semibold sm:mb-4 mb-1">
                Categories
              </h4>
              <ul className="flex flex-col gap-1 sm:text-base text-sm">
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
              <h4 className="text-white text-xl font-semibold sm:mb-4 mb-1">
                Contact Us
              </h4>
              <ul className="flex flex-col gap-1 sm:text-base text-sm">
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
          <div className="grid xl:grid-cols-[1fr_0.5fr] lg:grid-cols-[1fr_0.7fr] grid-cols-1 gap-8 items-center">
            <div className="lg:order-1 order-2 grid grid-cols-1">
              <ul className="flex lg:flex-nowrap flex-wrap lg:justify-start justify-center lg:gap-6 gap-x-6 lg:mb-5 lg:mt-0 mt-5 lg:order-1 order-2">
                <li className="lg:text-wrap text-nowrap">© 2026 Stonecera. All Rights Reserved.</li>
                <li>
                  <Link className="lg:text-wrap text-nowrap" href="/privacy-policy/">Privacy Policy</Link>
                </li>
                <li>
                  <Link className="lg:text-wrap text-nowrap" href="/terms-and-conditions/">Terms of use</Link>
                </li>
                <li>
                  <Link className="lg:text-wrap text-nowrap" href="/cookie-policy/">Cookie Policy</Link>
                </li>
              </ul>
              <div className="flex w-fit gap-x-4 py-1 px-4 bg-white/10 lg:order-2 order-1">
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
            <div className="newsletter lg:order-2 order-1">
              <h2 className="text-xl lg:text-right font-semibold mb-3">
                Subscribe to our Newsletter
              </h2>
              <p className="lg:text-right md:text-base text-sm">
                Stay ahead of the curve with our insights on stones. We&apos;re
                your gateway to understanding what&apos;s next.
              </p>
              <div className="flex mt-4 lg:w-full md:w-6/12">
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
