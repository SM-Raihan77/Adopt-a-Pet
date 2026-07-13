'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const SignUpPage: React.FC = () => {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as Record<string, string>;
        console.log("Form Submitted Data:", user);

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });

        if (data) {
            toast.success("Account created successfully");
            router.push("/"); 
        }
        if (error) {
            console.error("Error creating account:", error);
            toast.error("Error creating account");
        }
    };

    // const handleGoogleSignin = async (): Promise<void> => {
    //     await authClient.signIn.social({
    //         provider: "google"
    //     });
    //     toast.success("Logged in successfully");
    // };

  
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <Card className="w-full max-w-md p-8 shadow-xl border border-gray-100 rounded-3xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-500 mt-2">Join us and start booking your appointments easily.</p>
                </div>

                <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <TextField isRequired name="name" type="text" className="w-full">
                        <Label className="text-sm font-medium mb-1">Name</Label>
                        <Input placeholder="Enter your name" className="w-full p-2 border rounded-xl" />
                        <FieldError />
                    </TextField>

                    <TextField name="image" type="url" className="w-full">
                        <Label className="text-sm font-medium mb-1">Image URL</Label>
                        <Input placeholder="https://example.com/image.jpg" className="w-full p-2 border rounded-xl" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="email" type="email" className="w-full">
                        <Label className="text-sm font-medium mb-1">Email</Label>
                        <Input placeholder="john@example.com" className="w-full p-2 border rounded-xl" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired minLength={8} name="password" type="password" className="w-full">
                        <Label className="text-sm font-medium mb-1">Password</Label>
                        <Input placeholder="••••••••" className="w-full p-2 border rounded-xl" />
                        <Description className="text-xs text-gray-400 mt-1">
                            Must be at least 8 characters with 1 uppercase and 1 number
                        </Description>
                        <FieldError />
                    </TextField>

                    <Button 
                        type="submit" 
                        className="w-full bg-[#00A896] hover:bg-[#028090] text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-md mt-2"
                    >
                        Create Account
                    </Button>
                </Form>

                <div className="flex items-center gap-4 my-6">
                    <Separator className="flex-1" />
                    <span className="text-sm text-gray-400">OR</span>
                    <Separator className="flex-1" />
                </div>

                <Button
                    // onPress={handleGoogleSignin}
                    variant="outline"
                    className="w-full border border-gray-200 hover:bg-gray-50 py-3 rounded-full flex items-center justify-center gap-2 transition-all"
                >
                    <FcGoogle className="text-xl" /> 
                    <span className="font-medium text-gray-700">Sign up with Google</span>
                </Button>
            </Card>
        </div>
    );
};

export default SignUpPage;