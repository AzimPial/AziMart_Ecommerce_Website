"use client";

import { useState } from "react";
import { Pencil, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  address: Address;
}

export function AddressCard({ address }: AddressCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Delete this address?")) {
      setIsDeleting(true);
      // API call would go here
    }
  };

  return (
    <div className={cn(
      "border rounded-lg p-4 relative",
      address.isDefault && "border-highlight"
    )}>
      {address.isDefault && (
        <span className="absolute top-2 right-2 text-xs bg-highlight text-white px-2 py-1 rounded">
          Default
        </span>
      )}
      
      <h3 className="font-medium">{address.fullName}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {address.street}<br />
        {address.city}, {address.state} {address.zipCode}<br />
        {address.country}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{address.phone}</p>

      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={handleDelete} isLoading={isDeleting}>
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
        {!address.isDefault && (
          <Button variant="ghost" size="sm">
            <Check className="h-4 w-4 mr-1" />
            Set Default
          </Button>
        )}
      </div>
    </div>
  );
}