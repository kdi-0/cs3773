'use client'
import axios from 'axios';
import React from 'react';
import { useSession } from 'next-auth/react';

const DeleteFromCart = ({product, setCartItems}) => {

    const { data: session } = useSession();

    return (
        <div>
            <button onClick={() => {
                axios.post('/api/cart/delete', {
                    name: session.user.name,
                    email: session.user.email,
                    PRODUCT_ID: product.PRODUCT_ID,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    setCartItems(response.data);//update state of cart after removing product from cart
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