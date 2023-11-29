'use client';
import Link from 'next/link';
import AddToCart from './AddToCart';

const ProductCard = ({ product }) => {
  // Check if the product category is 12 to apply a 10% discount
  const isOnSale = product.PRODUCT_CATEGORY === 12;
  const discountedPrice = isOnSale
    ? product.PRODUCT_PRICE * 0.9
    : product.PRODUCT_PRICE;

  return (
    <div
      key={product.PRODUCT_ID}
      className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl relative"
    >
      {isOnSale && (
        <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1">
          Sale
        </div>
      )}
      <Link
        href={`/products/product/${product.PRODUCT_ID}`}
        className="flex flex-col items-center"
      >
        <img
          src={product.PRODUCT_IMAGE}
          className="w-48 h-48 object-cover rounded-t-lg"
          alt=""
        />
        <div className="p-4 w-full">
          <h1 className="text-lg font-semibold truncate">
            {product.PRODUCT_NAME}
          </h1>
          <div className="flex justify-between items-center w-full my-2">
            {/* Display the original price with a strikethrough if on sale */}
            <span
              className={`text-md font-medium ${
                isOnSale ? 'line-through text-red-500' : 'text-gray-800'
              }`}
            >
              ${product.PRODUCT_PRICE.toFixed(2)}
            </span>
            {/* Display the discounted price only if there is a discount */}
            {isOnSale && (
              <span className="text-md font-medium text-gray-800">
                ${discountedPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm text-gray-700 truncate">
            {product.PRODUCT_DESCRIPTION}
          </p>
          <div className="text-sm font-normal text-gray-600 flex items-center py-1">
            <span className="mr-2">Quantity:</span>
            <span className="inline-block px-2 py-1 text-sm font-semibold rounded-full bg-black text-white">
              {product.PRODUCT_QUANTITY}
            </span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        {/* Pass the discounted price to the AddToCart component */}
        <AddToCart product={{ ...product, PRODUCT_PRICE: discountedPrice }} />
      </div>
    </div>
  );
};

export default ProductCard;
