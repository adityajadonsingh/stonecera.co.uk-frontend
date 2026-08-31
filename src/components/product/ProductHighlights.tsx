import {
  Award,
  ShieldCheck,
  Truck,
  Gem,
} from "lucide-react";

const highlights = [
  {
    label: "Premium Grade",
    icon: Award,
  },
  {
    label: "Secure Payment",
    icon: ShieldCheck,
  },
  {
    label: "Free Delivery",
    icon: Truck,
  },
  {
    label: "Quality Guaranteed",
    icon: Gem,
  },
];

export default function ProductHighlights() {
  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      {highlights.map((highlight) => {
        const Icon = highlight.icon;

        return (
          <div
            key={highlight.label}
            className="
              group
              flex
              flex-col
              items-center
              gap-2
              rounded-lg
              border
              border-gray-100
              bg-white
              p-4
              text-center
              transition-colors
              duration-200
              hover:border-[#a67c52]
            "
          >
            <Icon
              size={20}
              strokeWidth={1.8}
              className="
                text-[#a67c52]
                transition-transform
                duration-200
                group-hover:scale-110
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[#262a18]
              "
            >
              {highlight.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}