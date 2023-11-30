'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

const Page = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Admin Dashboard
      </h1>
      <p className="text-xl">Hello, {session?.user.name}!</p>
    </div>
  );
};

export default Page;
