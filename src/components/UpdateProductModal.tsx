import React, { useState } from 'react';
import axios from 'axios';
import Para from './Para';
import UploadImage from '@/src/components/UploadImage';

interface UpdateProductModalProps {
  product: any;
  onClose: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  product,
  onClose,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product?.PRODUCT_NAME || '',
    category: product?.PRODUCT_CATEGORY || '',
    price: product?.PRODUCT_PRICE || 0,
    quantity: product?.PRODUCT_QUANTITY || 0,
    description: product?.PRODUCT_DESCRIPTION || '',
    images: product?.PRODUCT_IMAGES || '',
    // Add other fields as needed
  });
  const [info, setInfo] = useState('');
  const [updateInfo, setUpdateInfo] = useState<any>('');
  const [imageUrls, setImageUrls] = useState([]);
  const [saleOption, setSaleOption] = useState('');

  const handleImageChange = (newImageUrls) => {
    setImageUrls(newImageUrls);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/products`, {
        PRODUCT_ID: product.PRODUCT_ID,
        PRODUCT_NAME: updatedProduct.name,
        PRODUCT_CATEGORY: updatedProduct.category,
        PRODUCT_QUANTITY: updatedProduct.quantity,
        PRODUCT_PRICE: updatedProduct.price,
        PRODUCT_DESCRIPTION: updatedProduct.description,
        PRODUCT_IMAGE: updatedProduct.images,
        SALE_OPTION: saleOption,
        // Add other fields as needed
      });

      if (response.status === 200) {
        // Product updated successfully
        // Call onUpdate to trigger any additional actions
        onClose(); // Close the modal
        // Uncheck all radios
        handleUncheckRadios();
      } else {
        // Handle error
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (fieldName, value) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handlePriceChange = (fieldName, value) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      [fieldName]: parseInt(value),
    }));
  };

  const handleSaleOptionChange = (option) => {
    setSaleOption(option);

    // Set category ID based on the selected sale option
    let categoryId;
    switch (option) {
      case '12':
        categoryId = 12;
        break;
      case '13':
        categoryId = 13;
        break;
      case '14':
        categoryId = 14;
        break;
      default:
        categoryId = ''; // Handle other cases as needed
    }

    // Disable the category input when a sale option is selected
    setUpdatedProduct((prev) => ({
      ...prev,
      category: categoryId,
    }));
  };

  const handleUncheckRadios = () => {
    // Uncheck all radio buttons
    setSaleOption('');
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Update Product
            </h3>
            <div className="mt-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category:
              </label>
              <div className="flex items-center space-x-4 mt-1">
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={updatedProduct.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className={`p-2 border border-gray-300 rounded-md ${
                    saleOption ? 'bg-gray-200' : ''
                  }`}
                  disabled={!!saleOption}
                />
                <div className="ml-4 space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="saleOption"
                      value="10"
                      checked={saleOption === '12'}
                      onChange={() => handleSaleOptionChange('12')}
                      className="mr-2 text-blue-500 focus:ring-blue-400"
                    />
                    <span className="text-sm text-gray-700">10% Sale</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="saleOption"
                      value="20"
                      checked={saleOption === '13'}
                      onChange={() => handleSaleOptionChange('13')}
                      className="mr-2 text-blue-500 focus:ring-blue-400"
                    />
                    <span className="text-sm text-gray-700">20% Sale</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="saleOption"
                      value="30"
                      checked={saleOption === '14'}
                      onChange={() => handleSaleOptionChange('14')}
                      className="mr-2 text-blue-500 focus:ring-blue-400"
                    />
                    <span className="text-sm text-gray-700">30% Sale</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={updatedProduct.quantity}
                onChange={(e) => handlePriceChange('quantity', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) => handlePriceChange('price', e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            <label
              htmlFor=""
              className="mt-2 block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <Para
              setDescription={(value) => handleChange('description', value)}
              description={updatedProduct.description}
            />
            <label
              htmlFor=""
              className="mt-2 block text-sm font-medium text-gray-700"
            >
              Upload images:
            </label>
            <UploadImage
              info={info}
              updateInfo={updateInfo}
              imageUrls={imageUrls}
              setImageUrls={setImageUrls}
              handleImageChange={handleImageChange}
            />
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
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;