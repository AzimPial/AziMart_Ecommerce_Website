import { AccountLayout } from "@/components/user/AccountLayout";
import { Switch } from "@/components/ui/Switch";
import { toast } from "sonner";

export default function AccountNotificationsPage() {
  const handleToggle = async (setting: string, enabled: boolean) => {
    // API call to update notification preferences
    toast.success(`Notification preference updated`);
  };

  return (
    <AccountLayout activeTab="notifications">
      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

      <div className="space-y-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <div>
            <p className="font-medium">Order Updates</p>
            <p className="text-sm text-muted-foreground">
              Receive updates about your order status
            </p>
          </div>
          <Switch defaultChecked onCheckedChange={(e) => handleToggle("orderUpdates", e)} />
        </div>

        <div className="flex justify-between items-center pb-4 border-b">
          <div>
            <p className="font-medium">Promotions & Deals</p>
            <p className="text-sm text-muted-foreground">
              Get notified about sales and special offers
            </p>
          </div>
          <Switch onCheckedChange={(e) => handleToggle("promotions", e)} />
        </div>

        <div className="flex justify-between items-center pb-4 border-b">
          <div>
            <p className="font-medium">New Product Alerts</p>
            <p className="text-sm text-muted-foreground">
              Be the first to know about new arrivals
            </p>
          </div>
          <Switch onCheckedChange={(e) => handleToggle("newProducts", e)} />
        </div>

        <div className="flex justify-between items-center pb-4 border-b">
          <div>
            <p className="font-medium">Price Drops</p>
            <p className="text-sm text-muted-foreground">
              Get alerts when items in your wishlist drop in price
            </p>
          </div>
          <Switch defaultChecked onCheckedChange={(e) => handleToggle("priceDrops", e)} />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Newsletter</p>
            <p className="text-sm text-muted-foreground">
              Weekly digest and updates from AziMart
            </p>
          </div>
          <Switch onCheckedChange={(e) => handleToggle("newsletter", e)} />
        </div>
      </div>
    </AccountLayout>
  );
}