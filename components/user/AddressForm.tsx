"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code is required"),
  country: z.string().default("United States"),
  phone: z.string().min(10, "Phone number is required"),
  isDefault: z.boolean().default(false),
});

type AddressForm = z.infer<typeof addressSchema>;

interface AddressFormProps {
  initialData?: AddressForm;
  onSubmit: (data: AddressForm) => void;
  onCancel: () => void;
}

export function AddressForm({ initialData, onSubmit, onCancel }: AddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  });

  const onFormSubmit = async (data: AddressForm) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      toast.success(initialData ? "Address updated" : "Address added");
    } catch {
      toast.error("Failed to save address");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <Input {...register("fullName")} error={errors.fullName?.message} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Street Address</label>
        <Input {...register("street")} error={errors.street?.message} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <Input {...register("city")} error={errors.city?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <Input {...register("state")} error={errors.state?.message} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <Input {...register("zipCode")} error={errors.zipCode?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <Input {...register("country")} error={errors.country?.message} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <Input {...register("phone")} error={errors.phone?.message} />
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("isDefault")} />
        <span className="text-sm">Set as default address</span>
      </label>

      <div className="flex gap-3 pt-4">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? "Update Address" : "Add Address"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}