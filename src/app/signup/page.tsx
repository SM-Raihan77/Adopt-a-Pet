'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // নেভিগেশনের জন্য Link ইমপোর্ট করা হয়েছে
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const user = Object.fromEntries(formData.entries()) as Record<string, string>;

        try {
            const { data, error } = await authClient.signUp.email({
                email: user.email,
                password: user.password,
                name: user.name,
                image: user.image,
            });

            if (data) {
                toast.success("Account created successfully! 🐾");
                form.reset();
                router.push("/"); 
            }
            if (error) {
                console.error("Error creating account:", error);
                toast.error(error.message || "Error creating account");
            }
        } catch (err: any) {
            console.error(err);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
            {/* Title Section */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Create Account
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Join us today to start your journey of adopting a loving pet.
                </p>
            </div>

            {/* SignUp Card */}
            <Card className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm">
                <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Name Field */}
                    <TextField isRequired name="name" type="text" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Full Name
                        </Label>
                        <Input 
                            placeholder="Enter your name" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896] outline-none transition-all text-sm" 
                        />
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>

                    {/* Image URL Field */}
                    <TextField name="image" type="url" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Profile Image URL
                        </Label>
                        <Input 
                            placeholder="https://example.com/image.jpg" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896] outline-none transition-all text-sm" 
                        />
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>

                    {/* Email Field */}
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Email Address
                        </Label>
                        <Input 
                            placeholder="john@example.com" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896] outline-none transition-all text-sm" 
                        />
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired minLength={8} name="password" type="password" className="flex flex-col gap-1.5">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            Password
                        </Label>
                        <Input 
                            placeholder="••••••••" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-900 dark:text-white focus:border-[#00A896] focus:ring-1 focus:ring-[#00A896] outline-none transition-all text-sm" 
                        />
                        <Description className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
                            Must be at least 8 characters with 1 uppercase and 1 number
                        </Description>
                        <FieldError className="text-xs text-rose-500 mt-0.5" />
                    </TextField>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <Button 
                            type="submit" 
                            isLoading={isLoading}
                            className="w-full py-3 text-sm font-bold tracking-wide text-white bg-[#00A896] hover:bg-[#009282] rounded-xl shadow-sm transition-all flex items-center justify-center"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </div>
                </Form>

                {/* Switch to Login Page Section */}
                <div className="text-center mt-6">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                        <Link 
                            href="/login" 
                            className="font-bold text-[#00A896] hover:text-[#009282] transition-colors underline underline-offset-4"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default SignUpPage;