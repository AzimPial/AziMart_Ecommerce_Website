import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-1">Order ID</p>
          <p className="font-mono font-semibold">#AZM-{Date.now().toString().slice(-8)}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/orders">
            <button className="w-full px-6 py-3 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors">
              View Orders
            </button>
          </Link>
          <Link href="/shop">
            <button className="w-full px-6 py-3 border border-input rounded-md font-medium hover:bg-muted transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}