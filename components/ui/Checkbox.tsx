"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-highlight focus:ring-highlight cursor-pointer",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {label && (
          <label className="text-sm font-medium cursor-pointer" htmlFor={props.id}>
            {label}
          </label>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };