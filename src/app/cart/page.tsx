'use client'
import GetCartItems from "@/src/components/GetCartItems";
import Navbar from "../../components/Navbar";
import Link from 'next/link';
import axios from 'axios';
import { useSession, signOut, signIn } from 'next-auth/react';
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/router';


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

              <div className="inline-block">
                <div className="text-right py-3 px-4 inline-block border p-3 d-flex justify-content-end">
                  <h3 className={` text-center text-xl font-semibold`}>
                    Order Summary
                  </h3>
                  <hr style={{ width: 200 }}></hr>
                  <div className="row">
                    <div className="text-left py-3 px-4 inline-block">
                      <p className="text-left">Item 1</p>
                    </div>
                    <div className="py-3 px-4 inline-block">
                      <p className="text-left">$345678</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="text-left py-3 px-4 inline-block">
                      <p className="text-left">Shipping</p>
                    </div>
                    <div className="py-3 px-4 inline-block">
                      <p className="text-left">$3.78</p>
                    </div>
                  </div>
                  <hr style={{ width: 200 }}></hr>
                  <div className="row">
                    <div className="text-left py-3 px-4 inline-block">
                      <p className="text-left">Subtotal</p>
                    </div>
                    <div className="py-3 px-4 inline-block">
                      <p className="text-left">$3333.78</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="text-left py-3 px-4 inline-block">
                      <p className="text-left">Taxes</p>
                    </div>
                    <div className="py-3 px-4 inline-block">
                      <p className="text-left">$32.78</p>
                    </div>
                  </div>
                  <hr style={{ width: 200 }}></hr>
                  <div className="row">
                    <div className="text-left py-3 px-4 inline-block">
                      <p className="font-semibold text-left">Order Total</p>
                    </div>
                    <div className="py-3 px-4 inline-block">
                      <p className="font-semibold text-left">$323.78</p>
                    </div>
                  </div>
                </div>
                <button className="border font-semibold text-s">Apply a Coupon</button>
                <button className="border font-semibold">Checkout</button>
                <button className="border font-semibold text-s">Apply a Coupon</button>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
