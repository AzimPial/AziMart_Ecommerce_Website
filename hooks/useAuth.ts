"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          toast.error("Invalid credentials");
          return false;
        }

        toast.success("Welcome back!");
        router.push("/");
        return true;
      } catch (error) {
        toast.error("Login failed");
        return false;
      }
    },
    [router]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!data.success) {
          toast.error(data.error || "Registration failed");
          return false;
        }

        toast.success("Account created! Please log in.");
        router.push("/login");
        return true;
      } catch (error) {
        toast.error("Registration failed");
        return false;
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    toast.success("Logged out successfully");
    router.push("/");
  }, [router]);

  const isAdmin = session?.user?.role === "admin";
  const isAuthenticated = !!session?.user;

  return {
    session,
    status,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    updateSession: update,
  };
}