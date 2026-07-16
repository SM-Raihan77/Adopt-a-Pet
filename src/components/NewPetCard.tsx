"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Pet {
    _id: string;
    name: string;
    location: string;
    type: string;
    gender: string;
    age: string;
    breed: string;
    isVaccinated: boolean;
    image: string;
}

interface NewPetCardProps {
    pet: Pet;
}

const NewPetCard: React.FC<NewPetCardProps> = ({ pet }) => {
    return (
        <Link href={`/explore-pet/${pet._id}`}>
            <div className="relative border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white h-full cursor-pointer group transition-transform hover:scale-[1.02] hover:shadow-md">

                {/* "New" Badge */}
                <span className="absolute top-3 left-3 z-10 bg-[#00A896] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    New
                </span>

                {/* Pet Image */}
                <div className="relative w-full h-48 overflow-hidden">
                    <Image
                        fill
                        priority
                        src={pet.image}
                        alt={pet.name || "Pet"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Pet Info */}
                <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-800">{pet.name}</h3>
                    <p className="text-gray-500 text-sm">📍 {pet.location}</p>

                    <div className="flex gap-2 mt-3 flex-wrap text-xs text-gray-600">
                        <span className="bg-cyan-50 px-2 py-1 rounded">{pet.type}</span>
                        <span className="bg-cyan-50 px-2 py-1 rounded">{pet.breed}</span>
                        <span className="bg-cyan-50 px-2 py-1 rounded">{pet.age}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NewPetCard;