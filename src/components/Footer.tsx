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
import WhatsAppIcon from "../../public/media/whatsapp.png";

export default function Footer({
  categories,
  footerDetail,
}: {
  categories: Category[];
  footerDetail: FooterDetail | null;
}) {
  const phone = footerDetail?.companyPhoneNumbers?.[0]?.phone;
  const email = footerDetail?.companyEmails?.[0]?.email;
  const address = footerDetail?.companyAddress;

  return (
    <>
      <footer className="bg-[#262a18] font-sans">
        {/* MAIN FOOTER */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 md:py-16 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div>
                <div className="serif text-2xl text-white leading-none">
                  Stonecera
                </div>

                <div className="text-[8px] tracking-[0.2em] uppercase text-[#99a14e] mt-1">
                  Natural Stone Specialists
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6 text-[#f5f0e8]/60">
              Premium natural stone and porcelain specialists. Sourced
              globally, delivered across the UK with unmatched technical
              expertise.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="flex items-center gap-3">
              {footerDetail?.facebookLink && (
                <Link
                  href={footerDetail.facebookLink}
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-[#d8c06a] hover:border-[#d8c06a] transition-colors"
                >
                  <Facebook size={14} />
                </Link>
              )}

              {footerDetail?.twitterLink && (
                <Link
                  href={footerDetail.twitterLink}
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-[#d8c06a] hover:border-[#d8c06a] transition-colors"
                >
                  <Twitter size={14} />
                </Link>
              )}

              {footerDetail?.instagramLink && (
                <Link
                  href={footerDetail.instagramLink}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-[#d8c06a] hover:border-[#d8c06a] transition-colors"
                >
                  <Instagram size={14} />
                </Link>
              )}

              {footerDetail?.linkedinLink && (
                <Link
                  href={footerDetail.linkedinLink}
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/20 flex items-center justify-center text-[#d8c06a] hover:border-[#d8c06a] transition-colors"
                >
                  <Linkedin size={14} />
                </Link>
              )}
            </div>
          </div>

          {/* MATERIALS / CATEGORIES */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-4 font-medium text-[#99a14e]">
              Materials
            </p>

            <div>
              {categories.map((category, index) => (
                <Link
                  key={`footer-category-${index}`}
                  href={`/product-category/${category.slug}/`}
                  className="block text-sm py-1.5 border-b border-white/[0.05] text-[#f5f0e8]/65 hover:text-[#d8c06a] transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* INFORMATION */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-4 font-medium text-[#99a14e]">
              Information
            </p>

            <div>
              <Link
                href="/about-us/"
                className="block text-sm py-1.5 border-b border-white/[0.05] text-[#f5f0e8]/65 hover:text-[#d8c06a] transition-colors"
              >
                About Us
              </Link>

              <Link
                href="/products/"
                className="block text-sm py-1.5 border-b border-white/[0.05] text-[#f5f0e8]/65 hover:text-[#d8c06a] transition-colors"
              >
               Products
              </Link>
              <Link
                href="/product-category/"
                className="block text-sm py-1.5 border-b border-white/[0.05] text-[#f5f0e8]/65 hover:text-[#d8c06a] transition-colors"
              >
                Product Category
              </Link>

              <Link
                href="/product-catalogue/"
                className="block text-sm py-1.5 border-b border-white/[0.05] text-[#f5f0e8]/65 hover:text-[#d8c06a] transition-colors"
              >
                Product Catalogue
              </Link>

              <Link
                href="/blogs/"
                className="block text-sm py-1.5 border-b border-white/[0.05] text-[#f5f0e8]/65 hover:text-[#d8c06a] transition-colors"
              >
                Blogs
              </Link>

              
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-4 font-medium text-[#99a14e]">
              Contact
            </p>

            <div className="space-y-4">
              {/* PHONE */}
              {phone && (
                <div className="flex items-start gap-3">
                  <Phone
                    size={14}
                    className="mt-0.5 shrink-0 text-[#d8c06a]"
                  />

                  <div>
                    <Link
                      href={`tel:${phone}`}
                      className="text-sm text-[#f5f0e8] hover:text-[#d8c06a] transition-colors"
                    >
                      {phone}
                    </Link>

                    <p className="text-xs text-[#f5f0e8]/50">
                      Mon–Fri 8am–6pm
                    </p>
                  </div>
                </div>
              )}

              {/* EMAIL */}
              {email && (
                <div className="flex items-start gap-3">
                  <Mail
                    size={14}
                    className="mt-0.5 shrink-0 text-[#d8c06a]"
                  />

                  <div>
                    <Link
                      href={`mailto:${email}`}
                      className="text-sm text-[#f5f0e8] hover:text-[#d8c06a] transition-colors"
                    >
                      {email}
                    </Link>

                    <p className="text-xs text-[#f5f0e8]/50">
                      Reply within 24 hours
                    </p>
                  </div>
                </div>
              )}

              {/* ADDRESS */}
              {address && (
                <div className="flex items-start gap-3">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-[#d8c06a]"
                  />

                  <div>
                    <p className="text-sm text-[#f5f0e8]">
                      {address.address}
                    </p>

                    <p className="text-xs text-[#f5f0e8]/50">
                      {address.city}, {address.pincode}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* NEWSLETTER */}
            <div className="mt-6 p-3 border border-[#d8c06a]/30 bg-[#d8c06a]/5">
              <p className="text-xs font-medium mb-2 text-[#d8c06a]">
                Newsletter
              </p>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 text-xs px-3 py-2 outline-none bg-white/[0.06] text-[#f5f0e8] border border-white/[0.15] placeholder:text-[#f5f0e8]/30"
                />

                <button
                  type="button"
                  className="px-3 py-2 text-xs font-medium shrink-0 bg-[#d8c06a] text-[#262a18] hover:bg-[#e2cf7d] transition-colors"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMER SERVICE + PAYMENTS */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-8 border-b border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CUSTOMER SERVICE LINKS */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase mb-4 font-medium text-[#99a14e]">
                Customer Service
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link
                  href="/contact-us/"
                  className="text-xs text-[#f5f0e8]/60 hover:text-[#d8c06a] transition-colors"
                >
                  Contact Us
                </Link>

                <Link
                  href="/shipping-policy/"
                  className="text-xs text-[#f5f0e8]/60 hover:text-[#d8c06a] transition-colors"
                >
                  Shipping Policy
                </Link>

                <Link
                  href="/cancellations-and-refunds/"
                  className="text-xs text-[#f5f0e8]/60 hover:text-[#d8c06a] transition-colors"
                >
                  Cancellations & Refunds
                </Link>

                <Link
                  href="/faqs/"
                  className="text-xs text-[#f5f0e8]/60 hover:text-[#d8c06a] transition-colors"
                >
                  FAQs
                </Link>
              </div>
            </div>

            {/* PAYMENT METHODS */}
<div className="lg:text-right">
  <p className="text-[10px] tracking-[0.25em] uppercase mb-4 font-medium text-[#99a14e]">
    Secure Payments
  </p>

  <div className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-white/70">
    <Image
      src={Visa}
      alt="Visa"
      width={44}
      height={32}
      className="object-contain"
    />

    <Image
      src={Mastercard}
      alt="Mastercard"
      width={44}
      height={32}
      className="object-contain"
    />

    <Image
      src={Amex}
      alt="American Express"
      width={44}
      height={32}
      className="object-contain"
    />

    <Image
      src={ApplePay}
      alt="Apple Pay"
      width={44}
      height={32}
      className="object-contain"
    />

    <Image
      src={Skrill}
      alt="Skrill"
      width={44}
      height={32}
      className="object-contain"
    />
  </div>
</div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#f5f0e8]/35">
            © 2026 Stonecera. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link
              href="/privacy-policy/"
              className="text-xs text-[#f5f0e8]/35 hover:text-[#f5f0e8]/80 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions/"
              className="text-xs text-[#f5f0e8]/35 hover:text-[#f5f0e8]/80 transition-colors"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/cookie-policy/"
              className="text-xs text-[#f5f0e8]/35 hover:text-[#f5f0e8]/80 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}