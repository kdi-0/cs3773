'use client'
import React, { useState, useEffect} from 'react';
import {  useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import OrderForm from '@/src/components/OrderForm';

export default function Page() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  let order_total_price;
  try{ 
    //just do another query of user's  from kerwin's db instead
    const searchParams = useSearchParams();
    order_total_price = searchParams.get('order_total_price');
    // const order_total_price = 0;
    console.log(order_total_price);
  }
  catch{
    console.log("ERROR, could not get order_total_price")
  }

  //get products in user's cart without the images for each product
   useEffect(() => {
    if (session?.user) {
      axios.post('/api/order/getCart', {
        name: session.user.name,
        email: session.user.email
      }).then((response) => {
        console.log("Response:", response);
        const res = JSON.parse(response.data);
        setCartItems(res);
        setLoading(false);
        console.log(cartItems);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
  }, [session]);

  if (loading) {
    return <div>Loading page...</div>;
  }
   

  return (
    <div>
      <OrderForm cartItems={cartItems} userEmail={session.user.email} order_total_price={order_total_price}/>
    </div>
  );
};

