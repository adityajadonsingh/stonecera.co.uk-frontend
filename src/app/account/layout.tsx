import { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AccountSidebar from "@/components/account/AccountSidebar";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container min-h-[60vh] py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <AccountSidebar />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}
