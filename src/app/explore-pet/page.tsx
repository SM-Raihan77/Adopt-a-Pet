
"use client";
import PetsCard from '@/components/PatsCard';
import React, { useEffect, useState } from 'react';
import { FaDog, FaCat, FaPaw, FaOtter } from 'react-icons/fa';

interface Pet {
    _id: string;
    petName: string;
    location: string;
    category: string;
    gender: string;
    age: string;
    breed: string;
    isVaccinated: string;
    imageUrl: string;
    description: string;
    type: string;
}

const ExploreAllPetPage: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);

    // 📄 Pagination States
    const [currentPage, setCurrentPage] = useState<number>(1);
    const petsPerPage = 6;

    useEffect(() => {
        fetch('http://localhost:5000/api/pets')
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    setPets(result.data);
                    setFilteredPets(result.data);
                }
            })
            .catch(err => console.error("Error fetching pets:", err))
            .finally(() => setLoading(false));
    }, []);

    // Filter pets by category
    const handleCategoryFilter = (type: string) => {
        console.log("Selected:", type);
        console.log("All pets:", pets);

        let filtered: Pet[];

        if (type === "all") {
            filtered = pets;
        } else if (type === "other") {
            
            filtered = pets.filter((pet) => {
                const petType = (pet.type ?? "").trim().toLowerCase();
                return petType !== "dog" && petType !== "cat";
            });
        } else {
            filtered = pets.filter((pet) => {
                return (pet.type ?? "").trim().toLowerCase() === type.trim().toLowerCase();
            });
        }

        console.log("Filtered:", filtered);

        setSelectedCategory(type);
        setCurrentPage(1);
        setFilteredPets(filtered);
    };

    //  Pagination Logic
    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    // 
    const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(filteredPets.length / petsPerPage);

    // pagination handler
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) return <div className="p-10 text-center">Loading all pets...</div>;

    return (
        <div className="max-w-7xl mx-auto p-10">
            <h1 className="text-3xl font-bold mb-8 text-cyan-600 text-center">Explore All Pets</h1>

            {/* Category Filter Buttons */}
            <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
                <button
                    onClick={() => handleCategoryFilter('all')}
                    className="flex flex-col items-center gap-2 group transition-transform hover:scale-105"
                >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${selectedCategory === 'all' ? 'border-[#00A896] bg-[#00A896]/10 text-[#00A896]' : 'border-slate-200 text-slate-500'
                        }`}>
                        <FaPaw className="text-3xl" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">All Pets</span>
                </button>

                <button
                    onClick={() => handleCategoryFilter('dog')}
                    className="flex flex-col items-center gap-2 group transition-transform hover:scale-105"
                >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${selectedCategory === 'dog' ? 'border-[#00A896] bg-[#00A896]/10 text-[#00A896]' : 'border-slate-200 text-slate-500'
                        }`}>
                        <FaDog className="text-3xl" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Find a dog</span>
                </button>

                <button
                    onClick={() => handleCategoryFilter('cat')}
                    className="flex flex-col items-center gap-2 group transition-transform hover:scale-105"
                >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${selectedCategory === 'cat' ? 'border-[#00A896] bg-[#00A896]/10 text-[#00A896]' : 'border-slate-200 text-slate-500'
                        }`}>
                        <FaCat className="text-3xl" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Find a cat</span>
                </button>

                <button
                    onClick={() => handleCategoryFilter('other')}
                    className="flex flex-col items-center gap-2 group transition-transform hover:scale-105"
                >
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${selectedCategory === 'other' ? 'border-[#00A896] bg-[#00A896]/10 text-[#00A896]' : 'border-slate-200 text-slate-500'
                        }`}>
                        <FaOtter className="text-3xl" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Other Pets</span>
                </button>
            </div>

            {/* Pets Display Grid*/}
            {currentPets.length === 0 ? (
                <p className="text-gray-500 text-center text-lg mt-10">
                    No pets available right now.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentPets.map((pet) => (
                            <PetsCard key={pet._id} pet={pet} />
                        ))}
                    </div>

                    {/* pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12">
                            {/* Previous Button */}
                            <button
                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                            >
                                Previous
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${currentPage === index + 1
                                            ? 'bg-[#00A896] text-white'
                                            : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ExploreAllPetPage;