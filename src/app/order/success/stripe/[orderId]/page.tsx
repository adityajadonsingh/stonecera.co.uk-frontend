import Link from "next/link";

export default function StripeSuccess({ params }: { params: { orderId: string } }) {
  const { orderId } = params;

  return (
    <main className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>

      <p className="text-lg">Your order ID:</p>
      <p className="text-2xl font-semibold mt-2">{orderId}</p>

      <p className="mt-4 text-gray-600">
        You will receive a confirmation email shortly.
      </p>

      <Link
        href={`/order/success/${orderId}`}
        className="inline-block mt-8 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        View Order Details
      </Link>
    </main>
  );
}
