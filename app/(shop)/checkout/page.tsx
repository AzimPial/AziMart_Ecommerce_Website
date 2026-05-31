"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code is required"),
  cardNumber: z.string().min(16, "Card number is required"),
  cardExpiry: z.string().min(5, "Expiry date is required"),
  cardCvc: z.string().min(3, "CVC is required"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, getSubtotal, clearCart } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      router.push("/checkout/success");
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">Nothing to checkout</h1>
          <p className="text-muted-foreground mb-6">Your cart is empty.</p>
          <Button asChild>
            <Link href="/shop">Go Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {["Shipping", "Payment", "Review"].map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > i + 1
                  ? "bg-highlight text-white"
                  : step === i + 1
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`ml-2 ${step === i + 1 ? "font-medium" : ""}`}>{s}</span>
            {i < 2 && <div className="w-16 h-px bg-muted mx-4" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Shipping */}
            {step === 1 && (
              <div className="border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <Input {...register("firstName")} error={errors.firstName?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <Input {...register("lastName")} error={errors.lastName?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" {...register("email")} error={errors.email?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <Input {...register("phone")} error={errors.phone?.message} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <Input {...register("address")} error={errors.address?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <Input {...register("city")} error={errors.city?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <Input {...register("state")} error={errors.state?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <Input {...register("zipCode")} error={errors.zipCode?.message} />
                  </div>
                </div>
                <Button type="button" className="mt-4" onClick={() => setStep(2)}>
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* Payment */}
            {step === 2 && (
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Payment Information</h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 mr-1" />
                    Secure SSL
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <Input
                      {...register("cardNumber")}
                      placeholder="1234 5678 9012 3456"
                      error={errors.cardNumber?.message}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <Input {...register("cardExpiry")} placeholder="MM/YY" error={errors.cardExpiry?.message} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVC</label>
                    <Input {...register("cardCvc")} placeholder="123" error={errors.cardCvc?.message} />
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <Button type="button" onClick={() => setStep(3)}>
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Review */}
            {step === 3 && (
              <div className="border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Review Your Order</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Shipping</h3>
                    <p className="text-sm text-muted-foreground">
                      Shipping details will be displayed here
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      Card ending in ****
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <Button type="submit" isLoading={isSubmitting}>
                    Place Order - {formatPrice(total)}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-highlight text-white text-xs flex items-center justify-center">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.price * item.qty)}</p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}