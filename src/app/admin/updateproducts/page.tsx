"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import UpdateProductModal from '@/src/components/UpdateProductModal';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      const responseData = response.data.data;

      if (!Array.isArray(responseData)) {
        console.error('Invalid data format:', responseData);
        return;
      }

      setProducts(responseData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Function to handle the "Update" button click
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
  };

  // Call the fetchProducts function when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return <div>No items</div>;
  }

  return (
    <div>
      <h1 className="py-3 text-xl">Products</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-20 gap-12">
        {products.map((product) => (
          <div key={product.PRODUCT_ID}>
            <Link href={`/products/product/${product.PRODUCT_ID}`}>
              <div className="relative rounded-lg">
                <img
                  src={product.PRODUCT_IMAGE.split('","')[0].slice(2, -2)}
                  className="w-[250px] h-[300px] object-cover object-top rounded-lg"
                  alt=""
                />
              </div>
            </Link>
            <div className="flex items-center justify-between mt-4">
              <div>
                <h1 className="text-[18px] font-medium max-w-[150px] whitespace-nowrap overflow-hidden">
                  {product.PRODUCT_NAME}
                </h1>
              </div>
              <button
                onClick={() => handleUpdateClick(product)}
                className="text-white bg-blue-500 rounded-lg px-4 py-2"
              >
                Update
              </button>
            </div>
            <span className="font-medium bg-gray-100 rounded-lg">
              ${product.PRODUCT_PRICE}.00
            </span>
          </div>
        ))}
      </div>

      {/* Modal for updating products */}
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default UpdateProduct;