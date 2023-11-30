'use client';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';
import { BsChevronCompactUp } from 'react-icons/bs';

import { BiSearch } from 'react-icons/bi';
import { useSession, signOut, signIn } from 'next-auth/react';
const Navbar = () => {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState<boolean>(false);

  const SignOut = () => {
    if (session && session.user) {
      return (
        <div className="relative group">
          <ul className="py-5 px-1 text-neutral-600">
            {session?.user && session.user.role === 'admin' && (
              <li className="whitespace-nowrap hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer">
                <a href="/admin/addproduct">Add Product</a>
              </li>
            )}
            <div
              onClick={() => signOut()}
              className="whitespace-nowrap hover:text-red-600 hover:bg-red-100 px-5 py-2 cursor-pointer"
            >
              Sign Out
            </div>
          </ul>
        </div>
      );
    }
    return (
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="p-2 bg-gray-100 rounded-xl hover:bg-gray-300 active:bg-gray-500"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="p-2 bg-gray-100 rounded-xl hover:bg-gray-300 active:bg-gray-500"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4 relative bg-white-200 px-5">
        <div className="flex items-center">
          <div className="font-semibold text-2xl">
            <a href="/">Critter Collectibles</a>
          </div>
          <nav className="max-md:hidden ml-10">
            <ul className="flex items-center opacity-70 text-[15px]">
              <li>
                <Link
                  href="/"
                  className="py-3 px-4 inline-block w-full hover:bg-gray-300 rounded-xl hover:font-bold"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="py-3 px-4 inline-block w-full hover:bg-gray-300 rounded-xl hover:font-bold"
                >
                  Products
                </Link>
              </li>
              {session?.user && session.user.role === 'admin' && (
                <li>
                  <Link
                    href="/admin"
                    className="py-3 px-4 inline-block w-full hover:bg-gray-300 rounded-xl hover:font-bold"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-10">
          <SearchBar />
          {session ? (
            <div
              className="relative group cursor-pointer"
              onClick={() => setShowNav(!showNav)}
            >
              <span className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-300 focus:bg-gray-300">
                {session.user.name}
              </span>
              <div
                className={`absolute bg-white z-[2] rounded-lg shadow-lg ${
                  showNav ? 'block' : 'hidden'
                }`}
              >
                <SignOut />
              </div>
            </div>
          ) : (
            <SignOut />
          )}
          {session && session.user && (
            <Link href="/cart">
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-300">
                <CiShoppingCart size={20} />
              </div>
            </Link>
          )}
          <span
            onClick={() => setShowNav(!showNav)}
            className="p-[9px] bg-gray-100 rounded-full md:hidden"
          >
            <BsChevronCompactUp
              className={`transition ease-in duration-150 ${
                showNav ? 'rotate-180' : '0'
              }`}
            />
          </span>
        </div>
      </div>
      <div
        className={`md:hidden ${
          showNav ? 'pb-4 px-5' : 'h-0 invisible opacity-0'
        }`}
      >
        <ul className="flex flex-col text-[15px] opacity-75 px-2">
          <li>
            <a href="/shop" className="py-3 inline-block w-full">
              Shop
            </a>
          </li>
          <li>
            <a href="/coupon" className="py-3 inline-block w-full">
              Coupon
            </a>
          </li>
          <li>
            <a href="/aboutus" className="py-3 inline-block w-full">
              About Us
            </a>
          </li>
        </ul>
        <div className="flex items-center bg-gray-100 p-2 rounded-log my-4 py-3">
          <input
            type="text"
            className="outline-none bg-transparent ml-2 w-full caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
            placeholder="Search"
            autoComplete="false"
          />
          <button>
            <BiSearch size={20} className="opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
