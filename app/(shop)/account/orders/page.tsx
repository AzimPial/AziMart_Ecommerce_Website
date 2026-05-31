import { AccountLayout } from "@/components/user/AccountLayout";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";

export default async function AccountOrdersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }

  await dbConnect();
  const orders = await Order.find({ user: session.user.id })
    .sort({ createdAt: -1 })
    .lean();
  const ordersData = JSON.parse(JSON.stringify(orders));

  return (
    <AccountLayout activeTab="orders">
      <h2 className="text-xl font-semibold mb-6">My Orders</h2>

      {ordersData.length > 0 ? (
        <div className="space-y-4">
          {ordersData.map((order: any) => (
            <div key={order._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-medium">Order #{order._id.toString().slice(-6)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
</p>
                </div>
                <Badge variant={order.status === "delivered" ? "success" : "default"}>
                  {order.status}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {order.items.slice(0, 3).map((item: any, index: number) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {item.qty}x {item.name}
                  </div>
                ))}
                {order.items.length > 3 && (
                  <span className="text-sm text-muted-foreground">
                    +{order.items.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">{formatPrice(order.total)}</p>
                <Link
                  href={`/account/orders/${order._id}`}
                  className="text-sm text-highlight hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p>No orders yet</p>
          <Link href="/shop" className="text-highlight hover:underline mt-2 inline-block">
            Start shopping
          </Link>
        </div>
      )}
    </AccountLayout>
  );
}