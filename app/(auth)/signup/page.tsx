"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signUpSchema } from "@/lib/validations";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Sign up failed");
      }

      toast.success("Account created successfully");
      router.push("/auth/signin");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-muted-foreground mt-2">Join AziMart today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Input
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Input
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  error={errors.password?.message}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="bg-muted/50 rounded-md p-3 text-sm">
              <p className="font-medium mb-2">Password must include:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> One uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> One number
                </li>
              </ul>
            </div>

            <div>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1 rounded" required />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-highlight hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-highlight hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-highlight hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}