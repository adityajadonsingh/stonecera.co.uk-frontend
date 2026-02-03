"use client";

import { CheckCircle, XCircle, X } from "lucide-react";

export type ToastType = "success" | "error";

interface Props {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: Props) {
  const isSuccess = type === "success";

  return (
    <div
      className={`
        flex items-center gap-3
        px-4 py-3 rounded-md shadow-lg
        text-white min-w-[280px]
        animate-slide-in
        ${isSuccess ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {isSuccess ? (
        <CheckCircle size={20} />
      ) : (
        <XCircle size={20} />
      )}

      <span className="flex-1 text-sm font-medium">{message}</span>

      <button onClick={onClose} className="opacity-80 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
}
