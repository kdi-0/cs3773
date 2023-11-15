'use client'
import GetCartItems from "@/src/components/GetCartItems";
import Navbar from "../../components/Navbar";
import React, {Suspense, useEffect, useState} from 'react'
import { useRouter } from 'next/router';


// pages are server sided components (Ramin reference). Any useState, useEffect, and storage is client sided.

export default function Page() {
  
//   const [order_total_price, setOrderTotalPrice] = useState(0)

//  //upon clicking checkout button, navigate to the order page and pass the order total price as a prop
//   const handleClick = () => {
//     const router = useRouter()
//     router.push({
//       pathname: '/order',
//       query: {order_total_price: order_total_price}
//     })
//   }
  
  // async function Callback(childData){
  //   // 'use server';
  //   const items = [];
  //   const existingCartItems = JSON.parse(childData);
  //   let i=0
  //   for(i=0; i<existingCartItems.length; i++){
  //     const prod_id = existingCartItems[i].PRODUCT_ID
  //     const prod_quantity = existingCartItems[i].PRODUCT_QUANTITY

  //     const result = await prisma.product.findUnique({
  //       where: {PRODUCT_ID: prod_id},
  //     })

  //     const total_cost = prod_quantity * result.PRODUCT_PRICE 

  //     // JSX code to be returned
  //     items.push(
  //       <div key={i}>
  //           <p>ProductId: {prod_id}</p>
  //           <p>{result.PRODUCT_NAME}</p>
  //           <p>{total_cost}</p>
  //           <p>Quantity: {prod_quantity}</p>
  //           <div className="relative rounded-lg">
  //               <img
  //                 src={result.PRODUCT_IMAGE.split('","')[0].slice(2, -2)}
  //                 className="w-[250px] h-[300px] object-cover object-top rounded-lg"
  //                 alt=""
  //               />
  //           </div>
  //       </div>
  //     );
  //   }

  //   return items;
  // }

  // useEffect(() => {
  //   Callback()
  // }, [])
  
  return (
    <main>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div>
          <div >
            <Navbar/>
          </div>
          
          <div className="container">
            <div className="row">
              <div className="d-flex align-items-start py-3 px-4 inline-block ">
                <h2 className="text-2xl font-semibold">
                  Review Cart
                </h2>
                <hr style={{width: 300}}></hr>
                <div>

                  <div>
                    <GetCartItems />
                    
                  </div>

                  <div className="text-left py-3 px-4 inline-block">
                    <img style={{width:50, height:100}} src="https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                  </div>
                  <div className="text-left py-3 px-4 inline-block">
                    <p className="font-semibold text-xs">Name of Item</p>
                    <p className="font-semibold text-xs">$45</p>
                    <p className="text-xs">Quantity: 3</p>
                  </div>
                  <div className="text-s">
                  <a>Remove</a>
                  </div>
                </div>

                <hr style={{width: 200}}></hr>
              </div>
              
              <div className="inline-block">
              <div  className="text-right py-3 px-4 inline-block border p-3 d-flex justify-content-end">
                <h3 className={` text-center text-xl font-semibold`}>
                  Order Summary
                </h3>
                <hr style={{width: 200}}></hr>
                <div className="row">
                  <div className="text-left py-3 px-4 inline-block">
                    <p className="text-left">Item 1</p>
                  </div>
                  <div className="py-3 px-4 inline-block">
                    <p className="text-left">$345678</p>
                  </div>
                </div>
                <div className="row">
                  <div className="text-left py-3 px-4 inline-block">
                    <p className="text-left">Shipping</p>
                  </div>
                  <div className="py-3 px-4 inline-block">
                    <p className="text-left">$3.78</p>
                  </div>
                </div>
                <hr style={{width: 200}}></hr>
                <div className="row">
                  <div className="text-left py-3 px-4 inline-block">
                    <p className="text-left">Subtotal</p>
                  </div>
                  <div className="py-3 px-4 inline-block">
                    <p className="text-left">$3333.78</p>
                  </div>
                </div>
                <div className="row">
                  <div className="text-left py-3 px-4 inline-block">
                    <p className="text-left">Taxes</p>
                  </div>
                  <div className="py-3 px-4 inline-block">
                    <p className="text-left">$32.78</p>
                  </div>
                </div>
                <hr style={{width: 200}}></hr>
                <div className="row">
                  <div className="text-left py-3 px-4 inline-block">
                    <p className="font-semibold text-left">Order Total</p>
                  </div>
                  <div className="py-3 px-4 inline-block">
                    <p className="font-semibold text-left">$323.78</p>
                  </div>
                </div>
              </div>
              <button className="border font-semibold text-s">Apply a Coupon</button>
              </div>
              
            </div>
          </div>
        </div>
      </Suspense>
    </main>
  );
}
