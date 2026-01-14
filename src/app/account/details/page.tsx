import type { Metadata } from "next";
import { redirect } from "next/navigation";
import UserDetailsForm from "@/components/account/UserDetailsForm";
import { getUserDetails } from "@/lib/api/getUserDetails";

export const metadata: Metadata = {
  title: "Account Details",
};


export default async function AccountDetailsPage() {
  const userDetails = await getUserDetails();
  if (!userDetails) {
    redirect("/login");
  }

  return (
    <>
      <h1 className="text-2xl text-dark font-semibold mb-4">Account details</h1>
      <p className="mb-6 text-gray-600">
        Update your name, profile image, and phone numbers.
      </p>
      <UserDetailsForm initialData={userDetails?.userDetails ?? null} />
    </>
  );
}
