'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import Navbar from '../../../components/Navbar';
import { useRouter } from 'next/navigation';
import Para from '../../../components/Para';
import UploadImage from '@/src/components/UploadImage';

const ProductForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    images: '',
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    console.log(formData.images);
    console.log(formData);
  }, [formData]);

  const [info, updateInfo] = useState<any>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  const postData = async () => {
    handleImageChange();
    try {
      const response = await axios.post('/api/addproduct', formData);
      console.log(response);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageChange = () => {
    const stringImages = JSON.stringify(imageUrls);
    setFormData({
      ...formData,
      images: stringImages,
      description: description,
    });
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === 'price'
        ? parseInt(e.target.value)
        : parseInt(e.target.value);
    const quantity =
      e.target.name === 'inventory'
        ? parseInt(e.target.value)
        : parseInt(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: value,
      [e.target.name]: quantity,
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: description,
      images: imageUrls.toString(),
    }));
  }, [imageUrls]);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: description,
    }));
  }, [description]);

  return (
    <div className="px-5 max-w mx-auto mb-10">
      <h1 className="text-3xl font-semibold py-6">Add product</h1>
      <div className="text-black mt-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <label htmlFor="title" className="font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-blue-600 px-4 focus:border-2 outline-none"
            />
          </div>
          <div>
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-blue-600 px-4 focus:border-2 outline-none"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="font-medium">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handlePriceChange}
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-blue-600 px-4 focus:border-2 outline-none"
            />
          </div>
          <div>
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handlePriceChange}
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-blue-600 px-4 focus:border-2 outline-none"
            />
          </div>
        </div>
        <label htmlFor="" className="mt-10 inline-block font-medium">
          Description about the product
        </label>
        <Para
          setDescription={setDescription}
          description={formData.description}
        />
        <label htmlFor="" className="mt-10 inline-block font-medium">
          Upload images
        </label>
        <UploadImage
          info={info}
          updateInfo={updateInfo}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          handleImageChange={handleImageChange}
        />
        <button
          onClick={postData}
          className="text-white mt-10 border-[1px] bg-purple-500 rounded-lg px-4 p-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
