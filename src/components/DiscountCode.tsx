'use client'

import React, { useState, } from 'react';
import axios from 'axios';

const DiscountCode = ({before_Tax_Order_total_price, setOrderTotalPrice, discountPercent, setDiscountPercent}) => {

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscountCodes, setAppliedDiscountCodes] = useState([]);
  // const [discountPercent, setDiscountPercent] = useState(0); 
  // discountPercent used for stacking coupons (ex: 10% and 5% should take 15% from the cost before any tax)

  //total cost with tax
  // const [order_total_price, setOrderTotalPrice] = useState(before_Tax_Order_total_price + (before_Tax_Order_total_price * .0825)); 
  
  const handleDiscountInputChange = (event) => {
    setDiscountCode(String(event.target.value));
    console.log("Discount code: ", discountCode);
  }
  
  // discount code main function
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
          let discountResPercent=discountPercent + discountResponse.data.discountValue;
          let discountAmount = before_Tax_Order_total_price * (discountResPercent/100);
    
          if(discountAmount > before_Tax_Order_total_price)
            discountAmount= before_Tax_Order_total_price; // order should be free

          let price_with_discount =  before_Tax_Order_total_price - discountAmount;
          //apply sales tax after discount is applied
          let taxCost = price_with_discount*0.0825;
           
          appliedDiscountCodes.push(discountResponse.data.discountCode); //add this coupon to the already used coupons array
          
          //do not immediately set these state variables earlier b/c they are updated asynchronously so save them for after operations are done
          setOrderTotalPrice((price_with_discount+taxCost).toFixed(2));  
          setAppliedDiscountCodes(appliedDiscountCodes); 
          setDiscountPercent(discountResPercent);
          console.log("Discount percent: ", discountResPercent);

          alert("Successfully applied discount code");
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

  return (
    <div>
       <input
          type="text"
          className="form-control border border-primary outline-none bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
          placeholder="Coupon Code"
          onChange={handleDiscountInputChange}
          maxLength={20}
        />
      <button className="border font-semibold" onClick={handleDiscountClick}>Apply Discount</button>
      <div>
      </div>
    </div>
  );
};

export default DiscountCode;
