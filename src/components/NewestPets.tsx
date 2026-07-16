"use client";
import NewPetCard from '@/components/NewPetCard';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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

const NewestPets: React.FC = () => {
    const [newestPets, setNewestPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/pets')
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    // _id (MongoDB ObjectId) এর মধ্যেই creation timestamp থাকে,
                    // তাই এইটা দিয়ে sort করলেই সবচেয়ে নতুন pet প্রথমে আসবে
                    const sorted = [...result.data].sort((a: Pet, b: Pet) =>
                        b._id.localeCompare(a._id)
                    );
                    setNewestPets(sorted.slice(0, 3));
                }
            })
            .catch(err => console.error("Error fetching newest pets:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-10 text-center">Loading newest pets...</div>;
    }

    if (newestPets.length === 0) {
        return null; // কোনো pet না থাকলে সেকশনটাই দেখাবে না
    }

    return (
        <section className="max-w-7xl mx-auto p-10">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-cyan-600">Newest Pets</h2>
                <Link
                    href="/explore-pet"
                    className="text-sm font-semibold text-[#00A896] hover:underline"
                >
                    See All Pets →
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newestPets.map((pet) => (
                    <NewPetCard key={pet._id} pet={pet} />
                ))}
            </div>
        </section>
    );
};

export default NewestPets;