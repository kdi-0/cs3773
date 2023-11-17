'use client'
import axios from 'axios';
import React from 'react';
import { useSession } from 'next-auth/react';

const DeleteFromCart = ({product, setCartItems, before_Tax_Order_total_price, setBeforeTaxOrderTotalPrice,
    setOrderTotalPrice}) => {

    const { data: session } = useSession();

    return (
        <div>
            <button onClick={() => {
                axios.post('/api/cart/delete', {
                    name: session.user.name,
                    email: session.user.email,
                    PRODUCT_ID: product.PRODUCT_ID,
                    oldCartCost: before_Tax_Order_total_price,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log("New cart cost after removal: ", response.data.newCartCost);
                    setBeforeTaxOrderTotalPrice(response.data.newCartCost)//update raw cost of cart now with the product removed
                    setOrderTotalPrice(response.data.newCartCost + (response.data.newCartCost*0.0825)); //update final cost too
                    setCartItems(response.data.cartItems);//update state of cart after removing product from cart
                    
                }).catch((error) => {
                    console.log("ERROR");
                    console.log(error);
                });
            }
            } className="border font-semibold">Remove item from cart</button>
        </div>
    );
};

export default DeleteFromCart;