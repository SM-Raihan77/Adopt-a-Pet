'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const router = useRouter();

//   const handleGoogleSignin = async (): Promise<void> => {
//     await authClient.signIn.social({
//       provider: 'google',
//     });
    
//     toast.success("Logged in successfully");
//   };

 
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as Record<string, string>;

    console.log(user);
    
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Logged in successfully");
      router.push("/"); 
    }

    if (error) {
    //   toast.error("Error logging in");
      toast.error("Error logging in");
    }
  };

 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Title Section */}
      <div className="text-center my-6">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-600">Manage your health, simplify your life.</p>
      </div>

      {/* Login Card */}
      <Card className="border rounded-xl shadow-lg w-full max-w-sm p-6">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value: string) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            // validate={(value: string) => {
            //   if (value.length < 8) return "Password must be at least 8 characters";
            //   if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
            //   if (!/[0-9]/.test(value)) return "Password must contain at least one number";
            //   return null;
            // }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          
          <Button className="w-full bg-cyan-500 text-white font-bold" type="submit">
            Login
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-4">
          <Separator className="flex-1" />
          <div className="text-sm text-gray-500 whitespace-nowrap">Or sign in with</div>
          <Separator className="flex-1" />
        </div>

        <Button
        //   onPress={handleGoogleSignin}
          variant="outline"
          className="w-full"
        >
          <FcGoogle className="mr-2" /> Sign in with Google
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;