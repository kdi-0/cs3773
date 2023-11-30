'use client';
import Link from 'next/link';

const CartLoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">
          Welcome! You must be a registered user to add items to cart.
        </h2>
        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Keep Browsing
          </button>
          <Link
            href="/login"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
          >
            Sign Up or Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartLoginModal;
