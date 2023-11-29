'use client';
import axios from 'axios';
import React from 'react';
import { useSession } from 'next-auth/react';

const DeleteFromCart = ({
  product,
  setCartItems,
  before_Tax_Order_total_price,
  setBeforeTaxOrderTotalPrice,
  setOrderTotalPrice,
  discountPercent,
}) => {
  const { data: session } = useSession();

  return (
    <div>
      <button
        onClick={() => {
          axios
            .post(
              '/api/cart/delete',
              {
                name: session.user.name,
                email: session.user.email,
                PRODUCT_ID: product.PRODUCT_ID,
                oldCartCost: before_Tax_Order_total_price,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
            .then((response) => {
              console.log(
                'New cart cost after removal: ',
                response.data.newCartCost
              );
              setBeforeTaxOrderTotalPrice(response.data.newCartCost);
              setOrderTotalPrice(
                (
                  response.data.newCartCost -
                  response.data.newCartCost * (discountPercent / 100) +
                  (response.data.newCartCost -
                    response.data.newCartCost * (discountPercent / 100)) *
                    0.0825
                ).toFixed(2)
              );
              setCartItems(response.data.cartItems);
            })
            .catch((error) => {
              console.log('ERROR');
              console.log(error);
            });
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Remove item from cart
      </button>
    </div>
  );
};

export default DeleteFromCart;
