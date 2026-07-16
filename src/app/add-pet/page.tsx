"use client";

import { Button, FieldError, Input, Label, ListBox, TextArea, TextField, Select } from '@heroui/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // 

const AddPetPage: React.FC = () => {    
    const [isPending, setIsPending] = useState<boolean>(false);
    const router = useRouter(); 

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        
        const form = e.currentTarget; 
        const formData = new FormData(form);
        const petData = Object.fromEntries(formData.entries());

        // Send the pet data to the backend API
        try {
            const response = await fetch('http://localhost:5000/api/pets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(petData),
            });

            const result = await response.json();

            if (!result.success) throw new Error(result.error || 'Failed to save');

            toast.success('Pet added successfully! 🐾');
            
            form.reset(); // ফর্ম সেফলি রিসেট হবে
            
            router.push('/'); 
            
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Something went wrong while adding the pet.');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <section className="min-h-screen py-16 bg-slate-50 dark:bg-slate-950 flex justify-center items-center px-4">
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-sm"
            >
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex p-3 bg-teal-50 dark:bg-teal-950/40 text-[#00A896] rounded-2xl mb-3">
                        <FaPaw className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        List a Pet for Adoption
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Fill out the details below to help a lovely companion find a safe and permanent home.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Pet Name */}
                        <div className="md:col-span-2">
                            <TextField name="petName" isRequired className="w-full flex flex-col gap-1.5">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Pet Name</Label>
                                <Input placeholder="Tommy" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896] outline-none transition-all text-sm" />
                                <FieldError className="text-xs text-rose-500 mt-0.5" />
                            </TextField>
                        </div>

                        {/* Location */}
                        <TextField name="location" isRequired className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Location</Label>
                            <Input placeholder="Cumilla, kandirpar" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896] outline-none transition-all text-sm" />
                            <FieldError className="text-xs text-rose-500 mt-0.5" />
                        </TextField>

                        {/* Category */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Type</Label>
                            <Select name="category" isRequired className="w-full" placeholder="Select category">
                                <Select.Trigger className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white text-sm focus:border-[#00A896]">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className="rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-50">
                                    <ListBox className="p-1">
                                        <ListBox.Item id="Cat" textValue="Cat" className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm cursor-pointer">Cat<ListBox.ItemIndicator /></ListBox.Item>
                                        <ListBox.Item id="Dog" textValue="Dog" className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm cursor-pointer">Dog<ListBox.ItemIndicator /></ListBox.Item>
                                        <ListBox.Item id="Bird" textValue="Bird" className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm cursor-pointer">Bird<ListBox.ItemIndicator /></ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Gender</Label>
                            <Select name="gender" isRequired className="w-full" placeholder="Select gender">
                                <Select.Trigger className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white text-sm">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className="rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-50">
                                    <ListBox className="p-1">
                                        <ListBox.Item id="Male" textValue="Male" className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm cursor-pointer">Male<ListBox.ItemIndicator /></ListBox.Item>
                                        <ListBox.Item id="Female" textValue="Female" className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm cursor-pointer">Female<ListBox.ItemIndicator /></ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Age */}
                        <TextField name="age" type="number" isRequired className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Age</Label>
                            <Input type="number" placeholder="3" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] outline-none text-sm" />
                            <FieldError className="text-xs text-rose-500 mt-0.5" />
                        </TextField>

                        {/* Breed */}
                        <TextField name="breed" isRequired className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Breed</Label>
                            <Input placeholder="Persian" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] outline-none text-sm" />
                            <FieldError className="text-xs text-rose-500 mt-0.5" />
                        </TextField>

                        {/* Vaccination Status */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Vaccination Status</Label>
                            <Select name="isVaccinated" isRequired className="w-full" placeholder="Select vaccination status">
                                <Select.Trigger className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white text-sm">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover className="rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-50">
                                    <ListBox className="p-1">
                                        <ListBox.Item id="True" textValue="True" className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm cursor-pointer">True<ListBox.ItemIndicator /></ListBox.Item>
                                        <ListBox.Item id="False" textValue="False" className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm cursor-pointer">False<ListBox.ItemIndicator /></ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired className="flex flex-col gap-1.5">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Image URL</Label>
                                <Input type="url" placeholder="https://example.com/pet.jpg" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] outline-none text-sm" />
                                <FieldError className="text-xs text-rose-500 mt-0.5" />
                            </TextField>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <TextField name="description" isRequired className="flex flex-col gap-1.5">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Description</Label>
                                <TextArea placeholder="Describe the pet..." className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] outline-none text-sm min-h-[100px] resize-y" />
                                <FieldError className="text-xs text-rose-500 mt-0.5" />
                            </TextField>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button
                            type="submit"
                            isLoading={isPending}
                            className="w-full py-3 text-sm font-bold tracking-wide text-white bg-[#00A896] hover:bg-[#009282] rounded-xl shadow-sm transition-all flex items-center justify-center"
                        >
                            {isPending ? "Adding Pet..." : "Add Pet"}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
};

export default AddPetPage;