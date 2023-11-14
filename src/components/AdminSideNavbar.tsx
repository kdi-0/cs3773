'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const AdminSideNavbar = () => {
  const pathname = usePathname();

  const isCurrentPage = (href: string) => {
    return pathname === href;
  };

  const getLinkStyle = (href: string) => {
    const baseStyle =
      'text-lg font-semibold text-gray-300 hover:text-gray-100 hover:bg-gray-700 py-3 px-4 rounded';

    return isCurrentPage(href)
      ? `${baseStyle} pointer-events-none opacity-50`
      : baseStyle;
  };

  return (
    <div className="w-128 bg-gray-800 p-4 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul>
        <li className="mb-4">
          <Link href="addproduct">
            <span className={getLinkStyle('admin/addproduct') }>
              Create Product
            </span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="creatediscountcode">
            <span className={getLinkStyle('admin/creatediscountcode')}>
              Create Discount Code
            </span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/modifyusers">
            <span className={getLinkStyle('admin/modifyusers')}>
              Modify Users
            </span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/items">
            <span className={getLinkStyle('admin/items')}>
              Show Currently Placed Items
            </span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/orderhistory">
            <span className={getLinkStyle('admin/orderhistory')}>
              Show History of Orders
            </span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/">
            <span className={getLinkStyle('/')}>Home</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideNavbar;