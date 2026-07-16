
'use client';

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Avatar, Card, Input, Button } from '@heroui/react';
import { FaUser } from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  
  // Client-side session fetch from Better Auth
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const user = session?.user;

  // state to hold the Better-Auth session token
  const [token, setToken] = useState<string>('');

  // Form states
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Load user profile details and fetch Token when session is ready
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setImageUrl(user.image || '');
    }

    // Better-Auth session token fetch function
    const getSessionToken = async () => {
      try {
        const activeSession = await authClient.getSession();
        
        
        const sessionToken = activeSession?.data?.session?.token;

        if (sessionToken) {
          setToken(sessionToken);
          // The desired session token will be printed in the console
          // console.log("🔑 better-auth.session_token value:", sessionToken);
        }
      } catch (error) {
        console.error("Error fetching session token:", error);
      }
    };

    if (session) {
      getSessionToken();
    }
  }, [user, session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      if (!user?.id) {
        throw new Error("User session not found. Please log in again.");
      }

      // Send PUT request directly to your Express backend on localhost:5000
      const response = await fetch(`http://localhost:5000/api/user/update/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Set the Authorization header for the backend request
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ name, image: imageUrl }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile.');
      }

      setMessage('Profile updated successfully! 🎉');
      
      // Refresh the Better Auth client session data to display updated values
      router.refresh(); 

    } catch (err: any) {
      console.error("Update Error:", err);
      setMessage(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSessionLoading) {
    return <div className="text-center mt-20 font-medium">Loading Profile...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 my-12 min-h-screen flex flex-col items-center justify-start">
      
      {/* Title Section */}
      <div className="w-full max-w-4xl mx-auto mb-6">
        <div className="flex flex-col items-center justify-center text-center mb-6 gap-2">
          <div className="p-2.5 bg-[#00A896]/10 rounded-xl text-[#00A896]">
            <FaUser className="text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            User Profile
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            View and update your account information below
          </p>
        </div>

        {/* Profile Card & Inline Edit Form */}
        <Card className="w-full bg-white p-6 border border-slate-100 rounded-3xl shadow-sm flex flex-col gap-6">
          
          {/* User Info Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left border-b border-slate-100 pb-6">
            <Avatar className="h-20 w-20 border-2 border-slate-100">
              <Avatar.Image
                alt={user?.name || "User"}
                src={imageUrl || user?.image}
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback className="text-2xl font-bold bg-slate-100 text-slate-400">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight capitalize">
                {user?.name || user?.email?.split('@')[0]}
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-0.5">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Inline Edit Form */}
          <form onSubmit={handleUpdate} className="space-y-5 max-w-xl mx-auto w-full py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Display Name"
                placeholder="Enter your name"
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              
              <Input
                label="Profile Image URL"
                placeholder="https://example.com/image.jpg"
                variant="bordered"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            {message && (
              <p className={`text-sm font-medium text-center ${
                message.includes('successfully') ? 'text-emerald-600' : 'text-red-500'
              }`}>
                {message}
              </p>
            )}

            <div className="flex justify-end pt-2">
              <Button 
                type="submit"
                className="bg-[#00A896] text-white font-semibold rounded-xl px-8"
                isLoading={isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </form>

        </Card>
      </div>

    </div>
  );
}