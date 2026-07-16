"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdoptionModal from '@/components/AdoptionModal'; 
import { authClient } from "@/lib/auth-client"; 
import { toast } from 'react-toastify';
import { CgUnavailable } from "react-icons/cg";
import { MdEventAvailable } from 'react-icons/md';


interface Pet {
  _id: string;
  name: string;
  location: string;
  category: string;
  gender: string;
  age: string;
  breed: string;
  isVaccinated: string;
  image: string;
  description: string;
  status?: string;
}

const PetDetailsPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const id = params ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
    

    const { data: session } = authClient.useSession();
    
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:5000/api/pets/${id}`)
            .then(res => res.json())
            .then(result => {
                if (result.success && result.data) setPet(result.data);
            })
            .catch(err => console.error("Error fetching pet details:", err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleConfirmAdopt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // user must be logged in to adopt a pet //
        
        if (!session?.user) {
            toast.error("Please login first to adopt a pet!");
            router.push('/login');
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());

      
        const adoptionData = {
            ...formEntries,
            userName: session.user.name || "Anonymous",
            userEmail: session.user.email
        };

        try {
            const response = await fetch(`http://localhost:5000/api/pets/${id}/adopt`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(adoptionData), 
            });

            const result = await response.json();

            if (result.success) {
                toast.success(`Congratulations! You have successfully adopted ${pet?.name}`);
                setIsModalOpen(false);
                setPet(prev => prev ? { ...prev, status: 'adopted' } : null);
            } else {
                toast.error(result.message || 'Adoption failed!');
            }
        } catch (error) {
            console.error("Adoption error:", error);
            toast.error('Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading details...</div>;
    if (!pet) return <div className="p-10 text-center text-red-500 font-medium">Pet not found!</div>;

    const isAdopted = pet.status === 'adopted';

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 relative">
            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm md:flex gap-8 p-6">
                
                {/* Image Section */}
                <div className="md:w-1/2 relative">
                    <img src={pet.image} alt={pet.name} className="w-full h-80 object-cover rounded-2xl shadow-sm" />
                    {isAdopted && <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">Adopted</div>}
                </div>

                {/* Info Section */}
                <div className="md:w-1/2 flex flex-col justify-between mt-6 md:mt-0">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-3xl font-bold text-gray-800">{pet.name}</h1>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${isAdopted ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                {isAdopted ? <CgUnavailable /> : <MdEventAvailable />} {isAdopted ? 'Adopted' : 'Available'}
                            </span>
                        </div>
                        <p className="text-gray-500 font-medium mb-4">📍 Location: {pet.location}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-cyan-50 p-3 rounded-xl"><span className="block text-xs text-gray-500">Breed</span><span className="font-semibold text-gray-700">{pet.breed}</span></div>
                            <div className="bg-cyan-50 p-3 rounded-xl"><span className="block text-xs text-gray-500">Age</span><span className="font-semibold text-gray-700">{pet.age}</span></div>
                            <div className="bg-cyan-50 p-3 rounded-xl"><span className="block text-xs text-gray-500">Gender</span><span className="font-semibold text-gray-700">{pet.gender}</span></div>
                            <div className="bg-cyan-50 p-3 rounded-xl"><span className="block text-xs text-gray-500">Vaccinated</span><span className="font-semibold text-gray-700">{pet.isVaccinated}</span></div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed text-sm mb-6">{pet.description}</p>
                    </div>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        disabled={isAdopted}
                        className={`w-full font-bold py-3 px-6 rounded-2xl transition duration-200 shadow-md ${
                            isAdopted ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-100'
                        }`}
                    >
                        {isAdopted ? 'Already Adopted' : 'Adopt Now'}
                    </button>
                </div>
            </div>

            {/* Reusable Component */}
            <AdoptionModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              petName={pet.name} 
              onConfirm={handleConfirmAdopt} 
              isSubmitting={isSubmitting} 
            />
        </div>
    );
};

export default PetDetailsPage;