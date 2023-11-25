'use client'
import GetCartItems from "@/src/components/GetCartItems";
import Navbar from "../../components/Navbar";
import { useSession, signOut, signIn } from 'next-auth/react';
import React, { Suspense, useEffect, useState } from 'react'


// pages are server sided components (Ramin reference). Any useState, useEffect, and storage is client sided.

export default function Page() {
  return (
    <main>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div>
          <div >
            <Navbar />
          </div>

          <div className="container">
            <div className="row">
              <div className="d-flex align-items-start py-3 px-4 inline-block ">
                <h2 className="text-2xl font-semibold">
                  Review Cart
                </h2>
                <hr style={{ width: 300 }}></hr>
                <div>
                  <GetCartItems />
                </div>
                <hr style={{ width: 200 }}></hr>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
