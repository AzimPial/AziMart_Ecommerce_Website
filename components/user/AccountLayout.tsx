"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, MapPin, CreditCard, Bell, Shield, LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { signOut } from "next-auth/react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "orders", label: "Orders", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

interface AccountLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

export function AccountLayout({ children, activeTab }: AccountLayoutProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/account/${tab.id}`}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-highlight text-white"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-8 border-t">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
              isLoading={isLoggingOut}
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 bg-white rounded-lg border p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}