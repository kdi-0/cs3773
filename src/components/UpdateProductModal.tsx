import React, { useState } from 'react';
import axios from 'axios';

interface UpdateProductModalProps {
  product: any;
  onClose: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ product, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.PRODUCT_NAME,
    category: product.PRODUCT_CATEGORY,
    price: product.PRODUCT_PRICE,
    // Add other fields as needed
  });

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/updateproduct/${product.PRODUCT_ID}`, updatedProduct);

      if (response.status === 200) {
        // Product updated successfully
        // Call onUpdate to trigger any additional actions
        onClose(); // Close the modal
      } else {
        // Handle error
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Update Product</h3>
            <div className="mt-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={updatedProduct.category}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Add other fields as needed */}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleUpdate}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;