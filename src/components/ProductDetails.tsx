'use client';
import { useState } from 'react';
import AddToCart from './AddToCart';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const isOnSale = product.PRODUCT_CATEGORY === 12;
  const discountedPrice = isOnSale
    ? product.PRODUCT_PRICE * 0.9
    : product.PRODUCT_PRICE;
  const handleQuantityChange = (event) => {
    const parsedQuantity = parseInt(event.target.value, 10) || 1;
    const safeQuantity = Math.min(
      Math.max(parsedQuantity, 1),
      product.PRODUCT_QUANTITY
    );
    setQuantity(safeQuantity);
  };
  return (
    <div className="container mx-auto my-8 p-5">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 lg:w-2/5 p-2">
          <img
            src={product.PRODUCT_IMAGE}
            alt={product.PRODUCT_NAME}
            className="w-full object-contain h-48 sm:h-72"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col p-2">
          <div className={`bg-${isOnSale ? 'red-100' : 'green-100'} p-5 mb-4`}>
            <h2 className="text-2xl font-bold mb-2 relative">
              {isOnSale ? (
                <>
                  <span className="text-red-500">{product.PRODUCT_NAME}</span>
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1">
                    On Sale
                  </span>
                </>
              ) : (
                product.PRODUCT_NAME
              )}
            </h2>
            <p className={`text-xl text-gray-800 mb-4`}>
              <span className={isOnSale ? 'line-through text-red-500' : ''}>
                ${product.PRODUCT_PRICE.toFixed(2)}
              </span>
              {isOnSale && (
                <span className="text-gray-800 ml-2">
                  ${discountedPrice.toFixed(2)}
                </span>
              )}
            </p>

            <p className="text-sm text-gray-800 mb-4">
              Quantity Left: {product.PRODUCT_QUANTITY}
            </p>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={product.PRODUCT_QUANTITY}
                value={quantity}
                onChange={handleQuantityChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
            <AddToCart
              product={
                isOnSale
                  ? { ...product, PRODUCT_PRICE: discountedPrice }
                  : product
              }
              intentQuantity={quantity}
            />
          </div>
          <div className="mt-4 p-5 bg-gray-100 border-t border-gray-200 flex-grow">
            <h3 className="text-lg font-semibold mb-2">Product Description</h3>
            <p className="text-gray-600">{product.PRODUCT_DESCRIPTION}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
