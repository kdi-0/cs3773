'use client'
import React from 'react';
import BuildCartView from './BuildCartView';
import axios from 'axios'
import prisma from '@/src/app/prismadb';


//you cannot make prisma queries nor async await in client side components

const GetCartItems = async () => {
  const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('Current cart: ', existingCartItems)

  if (existingCartItems.length === 0){ 
      console.log('cart is empty')
      return <div>No items in cart</div>
  }

  // try{
  // const response = await axios.post('api/cartdata', JSON.stringify(existingCartItems))
  //   // return response
  // }
  // catch(error) {
  //   console.log(error);
  // } 

  const items=[]
  let i=0
   for(i=0; i<existingCartItems.length; i++){
      const prod_id = existingCartItems[i].PRODUCT_ID
      const prod_quantity = existingCartItems[i].PRODUCT_QUANTITY

      // const result = await prisma.product.findUnique({
      //   where: {PRODUCT_ID: prod_id},
      // })

      // const total_cost = prod_quantity * result.PRODUCT_PRICE 
      const total_cost = prod_quantity * existingCartItems[i].PRODUCT_PRICE

      // JSX code to be returned
      items.push(
        <div key={i}>
            <p>ProductId: {prod_id}</p>
            <p>{existingCartItems[i].PRODUCT_NAME}</p>
            <p>{total_cost}</p>
            <p>Quantity: {prod_quantity}</p>
            <div className="relative rounded-lg">
                <img
                  src={existingCartItems[i].PRODUCT_IMAGE.split('","')[0].slice(2, -2)}
                  className="w-[250px] h-[300px] object-cover object-top rounded-lg"
                  alt=""
                />
            </div>
        </div>
      );
    }

    return items;
  


  // props.handleCallback(JSON.stringify(existingCartItems)) //must stringify to pass data
  
  // return (
  //   <div>
  //      <BuildCartView existingCartItems={existingCartItems}/>
  //   </div>
  // );
  }

export default GetCartItems;