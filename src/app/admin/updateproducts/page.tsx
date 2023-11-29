'use client';
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

  // Function to handle the "Delete" button click
  const handleDeleteClick = async (productId) => {
    try {
      const response = await axios.delete('/api/products', {
        data: { PRODUCT_ID: productId },
      });

      if (response.data.success) {
        // Product deleted successfully, update the product list
        fetchProducts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Call the fetchProducts function when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return <div>No items</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Update Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.PRODUCT_ID}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <Link href={`/products/product/${product.PRODUCT_ID}`}>
              {product.PRODUCT_IMAGE.split(',').map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl.trim()} // Remove leading/trailing whitespaces
                  className="w-[250px] h-[300px] object-cover object-top rounded-lg"
                  alt=""
                />
              ))}
            </Link>
            <div className="p-4">
              <Link href={`/products/product/${product.PRODUCT_ID}`}>
                <span className="text-xl font-medium text-blue-500 hover:underline">
                  {product.PRODUCT_NAME}
                </span>
              </Link>
              <p className="text-gray-500 mt-2">${product.PRODUCT_PRICE}.00</p>
              <button
                onClick={() => handleUpdateClick(product)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteClick(product.PRODUCT_ID)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </div>
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