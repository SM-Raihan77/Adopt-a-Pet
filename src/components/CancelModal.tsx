"use client";

import { useState } from "react";

interface CancelModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  petName: string;
  onConfirm: () => Promise<void>;
}

export default function CancelModal({
  isOpen,
  onOpenChange,
  petName,
  onConfirm,
}: CancelModalProps) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);

    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-red-600">
          Cancel Adoption
        </h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to cancel the adoption request for{" "}
          <span className="font-semibold">{petName}</span>?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg border px-4 py-2"
          >
            Keep
          </button>

          <button
            onClick={handleCancel}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Canceling..." : "Cancel Adoption"}
          </button>
        </div>
      </div>
    </div>
  );
}