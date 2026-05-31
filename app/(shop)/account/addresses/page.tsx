import { AccountLayout } from "@/components/user/AccountLayout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { AddressCard } from "@/components/user/AddressCard";
import { AddAddressModal } from "@/components/user/AddAddressModal";

export default async function AccountAddressesPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  let userData: any = { addresses: [] };
  if (process.env.MONGODB_URI) {
    try {
      await dbConnect();
      const user = await User.findById(session.user.id).lean();
      userData = JSON.parse(JSON.stringify(user)) || { addresses: [] };
    } catch {
      userData = { addresses: [] };
    }
  }

  return (
    <AccountLayout activeTab="addresses">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Addresses</h2>
        <AddAddressModal />
      </div>

      {userData.addresses && userData.addresses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {userData.addresses.map((address: any, index: number) => (
            <AddressCard key={index} address={address} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No addresses saved yet</p>
          <AddAddressModal />
        </div>
      )}
    </AccountLayout>
  );
}