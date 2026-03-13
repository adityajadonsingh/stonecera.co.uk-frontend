import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}