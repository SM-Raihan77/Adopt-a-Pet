"use client";
import React, { useEffect, useState } from 'react';
import RescheduleModal from '@/components/RescheduleModal';
import CancelModal from '@/components/CancelModal';


import { authClient } from "@/lib/auth-client"; 

interface Pet {
  _id: string;
  name: string;
  location: string;
  breed: string;
  image: string;
  adoptionDetails?: {
    adoptedAt: string;
    adopterPhone: string;
    adopterAddress: string;
    adoptedBy: string;
    adoptedEmail: string;
  };
}

const DashboardPage = () => {
 
  const { data: session, isPending } = authClient.useSession();
  
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [activePet, setActivePet] = useState<Pet | null>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);

  
  const currentUserEmail = session?.user?.email || "";

  // Fetch user's adopted pets from the backend API
  const fetchMyAdoptions = () => {
    if (!currentUserEmail) return;
    setLoading(true);
    
    fetch(`http://localhost:5000/api/my-adoptions?email=${encodeURIComponent(currentUserEmail)}`)
      .then(res => res.json())
      .then(result => {
        if (result.success) setMyPets(result.data);
      })
      .catch(err => console.error("Error fetching adoptions:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isPending || !currentUserEmail) return;
    fetchMyAdoptions();
  }, [currentUserEmail, isPending]);

  // handle reschedule confirmation
  const handleRescheduleConfirm = async (newDate: string) => {
    if (!activePet) return;
    try {
      const response = await fetch(`http://localhost:5000/api/adoptions/${activePet._id}/reschedule`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newDate })
      });
      const result = await response.json();
      if (result.success) {
        setIsRescheduleOpen(false);
        fetchMyAdoptions(); 
      }
    } catch (error) {
      console.error("Reschedule failed:", error);
    }
  };

  // handle cancel confirmation
  const handleCancelConfirm = async () => {
    if (!activePet) return;
    try {
      const response = await fetch(`http://localhost:5000/api/adoptions/${activePet._id}/cancel`, {
        method: 'PATCH'
      });
      const result = await response.json();
      if (result.success) {
        setIsCancelOpen(false);
        fetchMyAdoptions();
      }
    } catch (error) {
      console.error("Cancellation failed:", error);
    }
  };

  // Load user's dashboard when session is ready
  if (isPending) return <div className="p-10 text-center text-gray-600 font-medium">Checking authentication...</div>;
  
  

  if (loading) return <div className="p-10 text-center text-gray-600 font-medium">Loading your dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-2 text-cyan-600">Welcome, {session.user.name}!</h1>
      <p className="text-gray-500 mb-8">Manage your pet adoptions, schedules, and requests.</p>

      {myPets.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-8 rounded-2xl text-center text-gray-500">
          You haven't adopted any pets yet. 
        </div>
      ) : (
    
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 font-semibold text-sm">
                <th className="p-4 pl-6">PET</th>
                <th className="p-4">BREED</th>
                <th className="p-4">ADOPTION DATE</th>
                <th className="p-4">LOCATION</th>
                <th className="p-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {myPets.map((pet) => (
                <tr key={pet._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition">
                  {/* PET */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={pet.image} 
                        alt={pet.name} 
                        className="w-12 h-12 object-cover rounded-xl border border-gray-100" 
                      />
                      <span className="font-bold text-gray-800">{pet.name}</span>
                    </div>
                  </td>
                  
                  {/* BREED */}
                  <td className="p-4 font-medium text-gray-600">{pet.breed}</td>
                  
                  {/* ADOPTION DATE */}
                  <td className="p-4 text-gray-500">{pet.adoptionDetails?.adoptedAt || "N/A"}</td>
                  
                  {/* LOCATION */}
                  <td className="p-4 text-gray-600">📍 {pet.location}</td>
                  
                  {/* ACTIONS */}
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button 
                        onClick={() => {
                          setActivePet(pet);
                          setIsRescheduleOpen(true);
                        }}
                        className="bg-cyan-50 text-cyan-600 font-semibold text-xs px-3 py-2 rounded-xl hover:bg-cyan-100 transition"
                      >
                        Reschedule
                      </button>
                      <button 
                        onClick={() => {
                          setActivePet(pet);
                          setIsCancelOpen(true);
                        }}
                        className="text-red-500 font-semibold text-xs px-3 py-2 rounded-xl hover:bg-red-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* modals */}
      {activePet && (
        <RescheduleModal
          isOpen={isRescheduleOpen}
          onOpenChange={(open) => setIsRescheduleOpen(open)}
          currentDate={activePet.adoptionDetails?.adoptedAt || ""}
          onConfirm={handleRescheduleConfirm}
        />
      )}

      {activePet && (
        <CancelModal
          isOpen={isCancelOpen}
          onOpenChange={(open) => setIsCancelOpen(open)}
          petName={activePet.name}
          onConfirm={handleCancelConfirm}
        />
      )}
    </div>
  );
};

export default DashboardPage;