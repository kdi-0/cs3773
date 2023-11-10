'use client'
import React from 'react';
import BuildCartView from './BuildCartView';


const GetCartItems = () => {

  const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('Current cart: ', existingCartItems)

  if (existingCartItems.length === 0){ 
      console.log('cart is empty')
      return <div>No items in cart</div>
  }


  return (
    <div>
       <BuildCartView existingCartItems={existingCartItems}/>
    </div>
  );
};

export default GetCartItems;