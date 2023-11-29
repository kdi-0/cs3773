'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function OrderForm({ cartItems, userEmail, setCartItems }) {
  const router = useRouter();
  // console.log("Test", cartItems, userEmail);

  // console.log("Cart items from Order Form:" , cartItems);
  const [formData, setFormData] = useState({
    name: '',
    phoneNum: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    card_number: '',
    exp: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (cartItems.length !== 0 && cartItems !== null) {
      e.preventDefault();

      // Check if any field is empty and have 100 character limit for fields before submitting
      if (
        Object.values(formData).every(
          (value) => value.trim() !== '' && value.length < 100
        )
      ) {
        try {
          //get order total price
          let order_total_price = 0;
          await axios
            .post(
              '/api/order/getOrderTotalPrice',
              {
                email: userEmail,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((response) => {
              console.log('Response: ', response);
              order_total_price = parseFloat(
                response.data.orderTotalPrice.orderTotalPrice
              );
            })
            .catch((error) => {
              console.log(error);
            });

          //queries to order table in prisma (creates order)
          await axios
            .post(
              '/api/order/CreateOrder',
              {
                userEmail: userEmail,
                formData: formData,
                cartItems: cartItems,
                order_total_price: order_total_price,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((response) => {
              console.log('Order created with query');
            })
            .catch((error) => {
              console.log(error);
            });

          //empties user's cart
          await axios
            .post(
              '/api/order/EmptyCart',
              {
                userEmail: userEmail,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((response) => {
              console.log('Cart has been emptied');
              setCartItems([]);
            })
            .catch((error) => {
              console.log(error);
            });

          alert('Order successfully placed');
          router.push('/'); // navigate user to home page upon successful order creation
        } catch {
          console.log('ERROR: Problem occurred when submitting order form');
        }
      } else
        alert(
          'Please fill in all fields before submitting and make sure fields are less than 100 characters'
        );
    } else alert('ERROR: Cart is empty, cannot place an order');
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Phone Number:</label>
            <input
              type="text"
              name="phoneNum"
              value={formData.phoneNum}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Street Address:</label>
            <input
              type="text"
              name="street_address"
              value={formData.street_address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Zip Code:</label>
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Card Number:</label>
            <input
              type="text"
              name="card_number"
              value={formData.card_number}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Expiration Date (MM/YY):
            </label>
            <input
              type="text"
              name="exp"
              value={formData.exp}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">CVV:</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
