'use client';
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
          <Link href={`/addproduct`} as="/admin/addproduct">
            <span className={getLinkStyle('/addproduct')}>Create Product</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href={`/creatediscountcode`} as="/admin/creatediscountcode">
            <span className={getLinkStyle('/creatediscountcode')}>
              Create Discount Code
            </span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href={`/modifyusers`} as="/admin/modifyusers">
            <span className={getLinkStyle('/modifyusers')}>Modify Users</span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href={`/updateproducts`} as="/admin/updateproducts">
            <span className={getLinkStyle('/updateproducts')}>
              Update Products
            </span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href={`/orderhistory`} as="/admin/orderhistory">
            <span className={getLinkStyle('/orderhistory')}>
              Show History of Orders
            </span>
          </Link>
        </li>
        <li className="mb-4">
          <Link href={`/`}>
            <span className={getLinkStyle('/')}>Home</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideNavbar;
