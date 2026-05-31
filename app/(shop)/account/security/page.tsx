"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AccountLayout } from "@/components/user/AccountLayout";
import { ChangePasswordForm } from "@/components/user/ChangePasswordForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

export default function AccountSecurityPage() {
  const router = useRouter();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleEnable2FA = async () => {
    // In real app, this would trigger 2FA setup flow
    toast.info("2FA setup would be triggered here");
    setIs2FAEnabled(true);
  };

  return (
    <AccountLayout activeTab="security">
      <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <ChangePasswordForm onSuccess={() => router.refresh()} />
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add an extra layer of security to your account by requiring a verification code in addition to your password.
          </p>
          {is2FAEnabled ? (
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-lg">✓</span>
              <span>Two-factor authentication is enabled</span>
            </div>
          ) : (
            <Button onClick={handleEnable2FA}>Enable 2FA</Button>
          )}
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
          <p className="text-sm text-muted-foreground mb-4">
            These devices are currently logged into your account.
          </p>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Current Device</p>
                <p className="text-sm text-muted-foreground">MacBook Air - macOS</p>
              </div>
              <span className="text-sm text-green-600">Active now</span>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}