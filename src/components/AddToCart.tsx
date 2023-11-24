'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';

// MUST SEPARATE client side components such as on click events into their own component (put use client at top of file to specify this) and not be async. Async functions cannot be client side b/c waiting on server to provide response? (RAMIN NOTES)
const AddToCart = (props) => {

    const { data: session } = useSession();
    const { product } = props;

    return (
        <div>
            <button className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                onClick={() => {
                    axios.post('/api/cart/add', {
                        name: session.user.name,
                        email: session.user.email,
                        PRODUCT_ID: product.PRODUCT_ID,
                        PRODUCT_NAME: product.PRODUCT_NAME,
                        PRODUCT_QUANTITY: product.PRODUCT_QUANTITY,
                        PRODUCT_PRICE: product.PRODUCT_PRICE,
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((response) => {
                        alert("Added item to cart!")
                    }).catch((error) => {
                        console.log("ERROR");
                        console.log(error);
                    });
                }
                }>Add To Cart</button>
        </div>
    );
};

export default AddToCart;
