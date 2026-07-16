"use client";

import { useEffect, useState } from "react";

interface RescheduleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentDate: string;
  onConfirm: (newDate: string) => Promise<void>;
}

export default function RescheduleModal({
  isOpen,
  onOpenChange,
  currentDate,
  onConfirm,
}: RescheduleModalProps) {
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNewDate(currentDate || "");
  }, [currentDate, isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onConfirm(newDate);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800">
          Reschedule Adoption
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Choose a new adoption date.
        </p>

        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          className="mt-5 w-full rounded-lg border p-3 outline-none focus:border-cyan-500"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg border px-4 py-2"
          >
            Close
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}