'use client';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';
import { BsChevronCompactUp } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
type Props = {};
const Navbar = (props: Props) => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center justify-between py-4 relative bg-green-500 px-5">
        <div className="flex items-center">
          <div className="font-semibold text-2xl">
            <a href="/">Critter Collectibles</a>
          </div>
          <nav className="max-md:hidden ml-10">
            <ul className="flex items-center opacity-70 text-[15px]">
              <li>
                <a href="/" className="py-3 px-4 inline-block w-full">
                  Shop
                </a>
              </li>
              <li>
                <a href="/Coupons" className="py-3 px-4 inline-block w-full">
                  Coupons
                </a>
              </li>
              <li>
                <a href="/aboutUs" className="py-3 px-4 inline-block w-full">
                  About Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <div className="relative cursor-pointer">
            <img
              className="w-[35px] h-[35px] rounded-full object-cover"
              alt=""
            />
            <div className="absolute bg-white z-[2] rounded-lg shadow-lg">
              <Link href="/login">Login</Link>
            </div>
          </div>
          <Link href="/cart">
            <div className="p-2 bg-gray-100 rounded-full">
              <CiShoppingCart size={20} />
            </div>
          </Link>
          <span
            onClick={() => setShowNav(!showNav)}
            className="p-[9px] bg-gray-100 ronded-full md:hidden"
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
