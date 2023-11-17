'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DeleteFromCart from './DeleteFromCart';
import DiscountCode from './DiscountCode';


const GetCartItems = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [before_Tax_Order_total_price, setBeforeTaxOrderTotalPrice] = useState(0);
  
  const [order_total_price, setOrderTotalPrice] = useState(before_Tax_Order_total_price + (before_Tax_Order_total_price * .0825)); 

  //IMPORTANT NOTE, everytime a setState function is called, page has to 
  //rerender but those state variables are not reinitalized so between renders, they maintain their new value

  useEffect(() => {
    if (session?.user) {
      axios.post('/api/cart/view', {
        name: session.user.name,
        email: session.user.email
      }).then((response) => {
        console.log("Response:", response);
        const res = JSON.parse(response.data);
        setBeforeTaxOrderTotalPrice(res.total_price); 

        setOrderTotalPrice(res.total_price + res.total_price*0.0825);

        //IMPORTANT: set state functions are performed asynchronously so for this variable that is calculated by summing the costs for all of the products in the cart, this has to already be calculated before calling set() otherwise program will most likely set the value very late leading to slow response. Must calculate value in /api/cart/view as you wait until it is done then call set()
        setCartItems(res.userCart);
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
  //you cannot make prisma queries nor async await in client side components. Instead make queries in a api route and call with axios
  //upon clicking checkout button, navigate to the order page 

  const handleCheckoutClick = () => {
    // router.push(`/order?order_total_price=${order_total_price}`); //get rid of this
    router.push(`/order`);
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
          <DeleteFromCart product={product} setCartItems={setCartItems} before_Tax_Order_total_price={before_Tax_Order_total_price} setBeforeTaxOrderTotalPrice={setBeforeTaxOrderTotalPrice} setOrderTotalPrice={setOrderTotalPrice}/>
        </div>
      ))}
      <button className="border font-semibold" onClick={handleCheckoutClick}>Checkout</button>
      <DiscountCode before_Tax_Order_total_price={before_Tax_Order_total_price} setOrderTotalPrice={setOrderTotalPrice} />

      <div className="inline-block">
      <div className="text-right py-3 px-4 inline-block border p-3 d-flex justify-content-end">
        <h3 className={` text-center text-xl font-semibold`}>
          Order Summary
        </h3>
        <hr style={{ width: 200 }}></hr>

        {cartItems.map((product, index) => (
        <div key={index}>
          <div className="row">
            <div className="text-left py-3 px-4 inline-block">
              <p className="text-left">{product.PRODUCT_NAME} </p>
            </div>
            <div className="py-3 px-4 inline-block">
              <p className="text-left">${product.PRODUCT_QUANTITY * product.PRODUCT_PRICE}</p>
            </div>
          </div>
        </div>
        ))}
        
        <hr style={{ width: 200 }}></hr>
        <div className="row">
          <div className="text-left py-3 px-4 inline-block">
            <p className="text-left">Subtotal</p>
          </div>
          <div className="py-3 px-4 inline-block">
            <p className="text-left">${before_Tax_Order_total_price}</p>
          </div>
        </div>
        <div className="row">
          <div className="text-left py-3 px-4 inline-block">
            <p className="text-left">Taxes: 8.25%</p>
          </div>
          <div className="py-3 px-4 inline-block">
            <p className="text-left">$32.78</p>
          </div>
        </div>
        <hr style={{ width: 200 }}></hr>
        <div className="row">
          <div className="text-left py-3 px-4 inline-block">
            <p className="font-semibold text-left">Order Total</p>
          </div>
          <div className="py-3 px-4 inline-block">
            <p className="font-semibold text-left">${order_total_price}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};


export default GetCartItems;
