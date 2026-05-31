import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "error" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-highlight text-white",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-black",
  error: "bg-red-500 text-white",
  outline: "border border-muted-foreground text-muted-foreground",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}