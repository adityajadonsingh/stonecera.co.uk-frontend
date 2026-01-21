import { Mail, MessageCircleQuestionMark, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "../../../public/media/icons/whatsapp.png";
export default function NeedHelpBox() {
  return (
    <>
      <div className="need-help-section border-2 rounded-sm border-gray-200 text-center px-5 py-2 mt-5">
        <span className="block heading font-bold text-xl mb-4">
          Need Help ?
        </span>
        <div className="flex gap-4 mb-2 justify-center">
          <Link href={`tel:+441234567890`} title="Call Us">
            <button className="col cursor-pointer w-[65px] h-[65px] shadow-sm bg-[#f7f3eb] text-[#4c4331] hover:bg-[#4c4331] hover:text-white rounded-sm flex items-center justify-center">
              <Phone size={30} />
            </button>
          </Link>
          <Link href={`mailto:info@stonecera.co.uk`} title="Mail Us">
            <button className="col cursor-pointer w-[65px] h-[65px] shadow-sm bg-[#f7f3eb] text-[#4c4331] hover:bg-[#4c4331] hover:text-white rounded-sm flex items-center justify-center">
              <Mail size={30} />
            </button>
          </Link>
          <Link
            href={`https://wa.me/+447467648124`}
            title="WhatsApp Us your query"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="col cursor-pointer w-[65px] h-[65px] shadow-sm bg-[#f7f3eb] text-[#4c4331] hover:bg-[#4c4331] hover:text-white rounded-sm flex items-center justify-center">
              <Image src={WhatsAppIcon} alt="WhatsApp" width={35} height={35} />
            </button>
          </Link>
          <button className="col cursor-pointer w-[65px] h-[65px] shadow-sm bg-[#f7f3eb] text-[#4c4331] hover:bg-[#4c4331] hover:text-white rounded-sm flex items-center justify-center">
            <MessageCircleQuestionMark size={30} />
          </button>
        </div>
      </div>
    </>
  );
}
