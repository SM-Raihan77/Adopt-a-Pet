'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("Logged in successfully! 🎉");
        form.reset();
        router.push("/"); 
      }

      if (error) {
        toast.error(error.message || "Error logging in. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Log in to find and bring a lovely companion home.
        </p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm">
        <Form onSubmit={onSubmit} className="flex flex-col gap-5">
          
          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value: string) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
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
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Password
            </Label>
            <Input 
              placeholder="Enter your password" 
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
              className="w-full py-3 text-sm font-bold tracking-wide text-white bg-[#00A896] hover:bg-[#009282] rounded-xl shadow-sm transition-all flex items-center justify-center" 
              type="submit"
              isLoading={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;