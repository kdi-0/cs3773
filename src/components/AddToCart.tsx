'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import CartLoginModal from './CartLoginModal';
const AddToCart = (props) => {
  const { data: session } = useSession();
  let { product, intentQuantity } = props;
  const [isModalOpen, setModalOpen] = useState(false);

  const isOutOfStock = product.PRODUCT_QUANTITY === 0;
  const buttonClasses = `w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 ${
    isOutOfStock
      ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed'
      : 'bg-green-500 hover:bg-green-600'
  }`;
  const handleButtonClick = () => {
    if (!session) {
      setModalOpen(true);
      return;
    }
    const quantityToAdd = intentQuantity === undefined ? 1 : intentQuantity;
    axios
      .post(
        '/api/cart/add',
        {
          name: session.user.name,
          email: session.user.email,
          PRODUCT_ID: product.PRODUCT_ID,
          PRODUCT_NAME: product.PRODUCT_NAME,
          quantity: quantityToAdd,
          PRODUCT_PRICE: product.PRODUCT_PRICE,
          PRODUCT_IMAGE: product.PRODUCT_IMAGE,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        switch (response.data.status) {
          case 'success':
            alert('Added item to cart!');
            break;
          case 'out of stock':
            alert('Product is out of stock. Cannot add product to cart.');
            break;
          case 'overflow stock':
            alert(
              'Cannot add item to cart. You already have the entire available stock for that product in your cart'
            );
            break;
        }
      })
      .catch((error) => {
        console.log('ERROR');
        console.log(error);
      });
  };
  return (
    <div>
      <button className={buttonClasses} onClick={handleButtonClick}>
        Add To Cart
      </button>
      <CartLoginModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default AddToCart;
