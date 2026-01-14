import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AddressForm from "@/components/account/AddressForm";
import type { Address } from "@/lib/types";
import { getUserDetails } from "@/lib/api/getUserDetails";

export const metadata: Metadata = {
  title: "My Addresses",
};


export default async function AddressesPage() {
  const user = await getUserDetails();
  if (!user) {
    redirect("/login");
  }
  const savedAddresses = user.userDetails?.savedAddresses || [];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-dark">My Addresses</h1>
      <p className="text-gray-600 mb-6">
        Manage your saved shipping and billing addresses.
      </p>
      <AddressForm initialAddresses={savedAddresses as Address[]} />
    </div>
  );
}
