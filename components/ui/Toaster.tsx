"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { toast as toastLib, Toaster as SonnerToaster, type ToasterProps } from "sonner";

export function Toaster({ theme, position, ...props }: ToasterProps) {
  return <SonnerToaster theme={theme} position={position} {...props} />;
}

export { toastLib as toast };

type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
};

const toastStyles: Record<ToastType, string> = {
  success: "border-green-200 bg-green-50",
  error: "border-red-200 bg-red-50",
  info: "border-blue-200 bg-blue-50",
  warning: "border-yellow-200 bg-yellow-50",
};

export function useToast() {
  const router = useRouter();

  const toast = (type: ToastType, message: string, options?: ToastOptions) => {
    toastLib(message, {
      icon: icons[type],
      className: toastStyles[type],
      duration: options?.duration || 3000,
    });
  };

  return {
    success: (message: string, options?: ToastOptions) => toast("success", message, options),
    error: (message: string, options?: ToastOptions) => toast("error", message, options),
    info: (message: string, options?: ToastOptions) => toast("info", message, options),
    warning: (message: string, options?: ToastOptions) => toast("warning", message, options),
  };
}