'use client'
import Link from "next/link";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {
    return (
        <div key={product.PRODUCT_ID} className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl">
            <Link href={`/products/product/${product.PRODUCT_ID}`} className="flex flex-col items-center">
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
                        <span className="text-md font-medium text-gray-800">${product.PRODUCT_PRICE}</span>
                        <span className="text-sm font-normal text-gray-600">In stock: {product.PRODUCT_QUANTITY}</span>
                    </div>
                    <p className="text-sm text-gray-700 truncate">
                        {product.PRODUCT_DESCRIPTION}
                    </p>
                </div>
            </Link>
            <div className="px-4 pb-4">
                <AddToCart product={product} />
            </div>
        </div>
    )
};

export default ProductCard;
