// src/app/login/page.tsx

import LoginForm from "@/components/auth/LoginForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientRedirect from "./ClientRedirect";
import Link from "next/link";

export default async function LoginPage() {
  const user = await getCurrentUser();
  console.log("LoginPage - Current User:", user); // Debug log
  if (user) {
    redirect("/account"); // server redirect
  }

  return (
    <>
      <ClientRedirect /> {/* 👈 handles client case */}
      <div className="max-w-md mx-auto py-12">
        <div className="bg-skin px-6 py-8 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Customer Login</h1>
          <p className="mb-6 text-sm text-gray-600">
            Sign in to access your account and orders.
          </p>
          <LoginForm />
        </div>
        <div className="mt-8 border-t border-gray-400 pt-8">
          <Link
            href={`${process.env.NEXT_PUBLIC_MEDIA_URL}/api/connect/google?scope=openid email profile&redirect=${process.env.NEXT_PUBLIC_SITE_URL}/auth/google/callback`}
            className="flex items-center justify-center gap-2 border border-gray-200 shadow-md rounded px-4 py-2 hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Link>
        </div>
        <span className="inline-block mt-5">
          New Customer?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </span>
      </div>
    </>
  );
}
