'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import prisma from '@/src/app/prismadb';

const GetCartItems = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order_total_price, setOrderTotalPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState('');

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
  //the useRouter from the next/router is buggy as it is used for older versions of nextjs
  //you cannot make prisma queries nor async await in client side components
  //upon clicking checkout button, navigate to the order page and pass the order total price as a prop

  const handleCheckoutClick = () => {
    router.push(`/order?order_total_price=${order_total_price}`); //get rid of this
  }

  const handleDiscountInputChange = (event) => {
    setDiscountCode(String(event.target.value));
  }
  
  const handleDiscountClick = async () => {
    console.log("Discount code:", discountCode);
    if(discountCode.length != 0){ //there is a discount code trying to be applied
      // see if discount code exists
      const discount = await prisma.discount.findUnique({
          where: {
            DISCOUNT_CODE: discountCode
          }
        }
      )
      if(discount != null){
        console.log("Discount code exists. Applying discount...");
        setOrderTotalPrice(order_total_price - (order_total_price * (discount.DISCOUNT_VALUE/100)) ); //discount value is a whole number
      }
      else
        console.log("ERROR: Discount does not exist");
    }
    else{
      alert("ERROR: Must provide discount code");
    }
  }

  if (cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12">
      {cartItems.map((product, index) => (
        <div key={index}>
          <p className='text-lg'>Product Name: {product.PRODUCT_NAME}</p>
          <p className='text-base'>Unit Price: ${product.PRODUCT_PRICE}</p>
          <p className='text-base'>Quantity: {product.PRODUCT_QUANTITY}</p>
          <p className='font-semibold text-lg'>Total Price: ${parseFloat(product.PRODUCT_QUANTITY) * parseFloat(product.PRODUCT_PRICE)}</p>
          <div className="relative rounded-lg">
            <img
              src={product.PRODUCT_IMAGE}
              className="w-[100px] h-[100px] object-cover object-top rounded-lg"
              alt={`Product ${product.PRODUCT_ID}`}
            />
          </div>
        </div>
      ))}
      <button className="border font-semibold" onClick={handleCheckoutClick}>Checkout</button>
       <input
          type="text"
          onChange={handleDiscountInputChange}
          maxLength={20}
        />
      <button className="border font-semibold" onClick={handleDiscountClick}>Apply Discount</button>
      <p>Order total price: {order_total_price}</p>
    </div>
  );
};

export default GetCartItems;
