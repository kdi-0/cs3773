'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react';

// MUST SEPARATE client side components such as on click events into their own component (put use client at top of file to specify this) and not be async. Async functions cannot be client side b/c waiting on server to provide response? (RAMIN NOTES)
const AddToCart = (props) => {

    const { data: session } = useSession();
    let { product, intentQuantity } = props;

    const imageUrl = product.PRODUCT_IMAGE.split('","')[0].slice(2, -2);
    const isOutOfStock = product.PRODUCT_QUANTITY === 0;
    const buttonClasses = `w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 ${isOutOfStock ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`;
    const handleButtonClick = () => {
        const quantityToAdd = Number.isNaN(intentQuantity) ? 1 : intentQuantity;
        axios.post('/api/cart/add', {
            name: session.user.name,
            email: session.user.email,
            PRODUCT_ID: product.PRODUCT_ID,
            PRODUCT_NAME: product.PRODUCT_NAME,
            quantity: quantityToAdd,
            PRODUCT_PRICE: product.PRODUCT_PRICE,
            PRODUCT_IMAGE: imageUrl,
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
    return (
        <div>
            <button className={buttonClasses}
                onClick={handleButtonClick}>
                Add To Cart
            </button>
        </div>
    );
};

export default AddToCart;
