'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const GetCartItems = () => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      axios.post('/api/cart/view', {
        name: session.user.name,
        email: session.user.email
      }).then((response) => {
        setCartItems(JSON.parse(response.data));
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
  }, [session]);

  if (loading) {
    return <div>Loading cart items...</div>;
  }

  if (cartItems.length === 0) {
    return <div>No items in cart</div>;
  }
  console.log("Cart Items");
  console.log(cartItems);
  return (
    <div>
      {cartItems.map((product, index) => (
        <div key={index}>
          <p>Product Id: {product.PRODUCT_ID}</p>
          <p>Product Name: {product.PRODUCT_NAME}</p>
          <p>Unit Price: {product.PRODUCT_PRICE}</p>
          <p>Quantity: {product.PRODUCT_QUANTITY}</p>
          <p>Total Price: {parseFloat(product.PRODUCT_QUANTITY) * parseFloat(product.PRODUCT_PRICE)}</p>
          <div className="relative rounded-lg">
            <img
              src={product.PRODUCT_IMAGE}
              className="w-[100px] h-[100px] object-cover object-top rounded-lg"
              alt={`Product ${product.PRODUCT_ID}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetCartItems;
