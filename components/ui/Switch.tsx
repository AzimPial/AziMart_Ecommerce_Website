"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  checked: controlledChecked,
  onCheckedChange,
  defaultChecked,
  disabled = false,
  className,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleClick = () => {
    if (disabled) return;
    const newValue = !isChecked;
    if (!isControlled) {
      setInternalChecked(newValue);
    }
    onCheckedChange?.(newValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2",
        isChecked ? "bg-highlight" : "bg-muted-foreground/30",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
          isChecked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}