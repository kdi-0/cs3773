'use client'
import React from 'react';
import prisma from '@/src/app/prismadb';
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../src/app/api/auth/[...nextauth]/route";

function AddProductToSession(product_id, quantity){
//   const { data: session, status } = useSession()

//   //check if product already exists. If so, then just update quantity value. Otherwise, .push() new json object 
//   session.user.products.forEach((product) => {
//     console.log(product)
// });

}




const CartItem = () => {
  //product_id's fetched from session then fetch product's data from prisma to display
  // const { data: session, status } = useSession()
  // // const session = await getServerSession(authOptions)

  // if (session.products.length == 0)
  //   return <p>No items in cart</p>

  // const products = await prisma.product.findMany();
  //console.log(products[0]?.PRODUCT_IMAGE?.split(',')[0]);
  // if (products.length === 0) {
  //   return <div>No items</div>;
  // }

    //add to cart items are stored in the user's session. Store them in Json. DO not pass them through props. Fetch from user's session and get list of items.
    //   route.ts is implentation of session. NEXTAUTH -> useSession() temporarily store in session until the order is complete, the productID and quantity 
    // session stuff: api/auth/next

    //get product data

//   localStorage
//   //local storage holds an array of json objects where 
//   Object.keys(localStorage).forEach(function(key){
//    console.log(localStorage.getItem(key));
// });

  
  // const cartItem = {
  //   id: 1,
  //   name: 'Product Name',
  //   price: 10.99,
  // };
  // existingCartItems.push(cartItem);
  // Store the updated cart in `localStorage`
  // localStorage.setItem('cart', JSON.stringify(existingCartItems));
  
  const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(existingCartItems);




  return (
    <div>
      <h1>Hello from MyComponent</h1>
    </div>
  );
};

export default CartItem;