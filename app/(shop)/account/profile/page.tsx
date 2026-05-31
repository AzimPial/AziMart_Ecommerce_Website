import { AccountLayout } from "@/components/user/AccountLayout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default async function AccountProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  await dbConnect();
  const user = await User.findById(session.user.id).lean();
  const userData = JSON.parse(JSON.stringify(user));

  return (
    <AccountLayout activeTab="profile">
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
      
      <form className="space-y-4 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input defaultValue={userData.firstName} name="firstName" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input defaultValue={userData.lastName} name="lastName" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input type="email" defaultValue={userData.email} disabled />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input type="tel" defaultValue={userData.phone || ""} name="phone" />
        </div>

        <Button type="submit">Save Changes</Button>
      </form>

      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-medium mb-4">Account Details</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Member since</dt>
            <dd>{new Date(userData.createdAt).toLocaleDateString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Total orders</dt>
            <dd>{userData.orderCount || 0}</dd>
          </div>
        </dl>
      </div>
    </AccountLayout>
  );
}