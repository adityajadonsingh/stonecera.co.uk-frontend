export default function DeliveryContent() {
  return (
    <div className="space-y-4">
      <p>
        Enter your postcode to check delivery availability and pricing.
      </p>

      <div className="space-y-2">
        <p className="font-medium">🚚 Delivery Information:</p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Free delivery is available in many UK mainland areas</li>
          <li>A small surcharge may apply depending on your location</li>
          <li>Remote areas may have higher delivery charges</li>
          <li>Kerbside delivery via pallet network</li>
          <li>Driver will contact you before arrival</li>
          <li>Delivery usually within 2-4 working days</li>
          <li>Please ensure access for large delivery vehicles</li>
        </ul>
      </div>

      <p className="text-gray-500 text-xs">
        * Delivery charges and times may vary depending on postcode and product type.
      </p>
    </div>
  );
}