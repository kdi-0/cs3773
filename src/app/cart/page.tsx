'use client';
import GetCartItems from '@/src/components/GetCartItems';
import Navbar from '../../components/Navbar';
import { useSession, signOut, signIn } from 'next-auth/react';
import React, { Suspense, useEffect, useState } from 'react';

// pages are server sided components (Ramin reference). Any useState, useEffect, and storage is client sided.

export default function Page() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<h2>Loading...</h2>}>
        <div className="min-h-screen bg-blue-100 ">
          <div className="container mx-auto py-8 ">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Review Cart</h2>
              <hr className="my-4" />

              <div className="mb-8">
                <GetCartItems />
              </div>

              <hr className="my-4" />
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
