'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const GetCartItems = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order_total_price, setOrderTotalPrice] = useState(10);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscountCodes, setAppliedDiscountCodes] = useState([]);

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
    console.log("Discount code: ", discountCode);
  }
  
  const handleDiscountClick = async () => {
    console.log("Discount code:", discountCode);
    if(discountCode.length != 0){ //there is a discount code trying to be applied
      // if in a client component (use client) and trying to do prisma query, must make prisma query in an api route
      try{
        const discountResponse = await axios.post('/api/cart/discount', 
            {discountCode: discountCode});
        console.log('Response: ', discountResponse);

        //discount exists AND hasnt been applied already, apply discount to order total price
        if(discountResponse.data.discountExists == true && 
          !appliedDiscountCodes.includes(discountResponse.data.discountCode) ) {
          setOrderTotalPrice(order_total_price - (order_total_price * (discountResponse.data.discountValue/100)));
          appliedDiscountCodes.push(discountResponse.data.discountCode); //add this coupon to the already used coupons array
          setAppliedDiscountCodes(appliedDiscountCodes);
          console.log("Applied discount codes: ", appliedDiscountCodes);
        }
        else if(appliedDiscountCodes.includes(discountResponse.data.discountCode)){
          alert("Discount code already applied");
          console.log("Applied discount codes ", appliedDiscountCodes);
        }
        else{
          alert("ERROR: Discount code doesnt exist");
        }
      }
      catch{
        alert("ERROR from response of /cart/discount");
      }
    }
    else{
      alert("ERROR: Must provide a discount code");
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
          className="form-control border border-primary outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
          placeholder="Coupon Code"
          onChange={handleDiscountInputChange}
          maxLength={20}
        />
      <button className="border font-semibold" onClick={handleDiscountClick}>Apply Discount</button>
      <p>Order Total Price: {order_total_price}</p>
    </div>
  );
};

export default GetCartItems;
