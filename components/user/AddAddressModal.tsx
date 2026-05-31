"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AddressForm } from "./AddressForm";
import { toast } from "sonner";

interface AddressFormData {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export function AddAddressModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: AddressFormData) => {
    try {
      const response = await fetch("/api/user/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      setIsOpen(false);
      // Refresh page or update state
      window.location.reload();
    } catch {
      throw new Error("Failed to add address");
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add New Address
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Address"
      >
        <AddressForm
          onSubmit={handleSubmit}
          onCancel={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
}