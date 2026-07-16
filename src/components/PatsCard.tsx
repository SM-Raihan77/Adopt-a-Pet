import React from 'react';
import Link from 'next/link'; // Next.js-এর রাউটিং এর জন্য ইম্পোর্ট করলাম
import Image from 'next/image';

interface Pet {
  _id: string;
  name: string;
  location: string;
  category: string;
  gender: string;
  age: string;
  breed: string;
  isVaccinated: string;
  imageUrl: string;
  description: string;
  type: string;
  image: string; // Ensure this property exists for the image URL
}

interface PetsCardProps {
  pet: Pet;
}

const PetsCard: React.FC<PetsCardProps> = ({ pet }) => {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm p-4 bg-white flex flex-col justify-between h-full">
      <div>
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
          <Image
            fill
            priority
            src={pet.image} 
            alt={pet.name || "Pet"} 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover" 
          />
        </div>
        {/* Pet Information */}
        <h2 className="text-xl font-bold">{pet.name}</h2>
        <p className="text-gray-500 text-sm">📍 {pet.location}</p>
        
        {/* Pet Tags */}
        <div className="flex gap-2 mt-3 flex-wrap text-xs text-gray-600">
          <span className="bg-cyan-50 px-2 py-1 rounded">Category: {pet.type}</span>
          <span className="bg-cyan-50 px-2 py-1 rounded">Breed: {pet.breed}</span>
          <span className="bg-cyan-50 px-2 py-1 rounded">Age: {pet.age}</span>
          <span className="bg-cyan-50 px-2 py-1 rounded">Gender: {pet.gender}</span>
        </div>
        
        {/* Pet Description */}
        <p className="text-gray-700 text-sm mt-3 line-clamp-2">{pet.description}</p>
      </div>

      {/* View Details Button */}
      <div className="mt-5">
        <Link href={`/explore-pet/${pet._id}`}>
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200 text-center text-sm block">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PetsCard;