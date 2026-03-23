import { Suspense } from "react";
import GoogleCallbackClient from "./GoogleCallbackClient";

export const dynamic = "force-dynamic"; // 🔥 IMPORTANT

export default function Page() {
  return (
    <Suspense fallback={<div>Signing you in...</div>}>
      <GoogleCallbackClient />
    </Suspense>
  );
}