'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DiscountCode from '@/src/components/DiscountCode';
import ViewDiscountCode from '@/src/components/ViewDiscountCode';

const CreateDiscountCode = () => {
  const router = useRouter();
  const [discountData, setDiscountData] = useState({
    code: '',
    value: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'value') {
      const floatValue = parseFloat(e.target.value);
      setDiscountData({
        ...discountData,
        value: floatValue,
      });
    } else {
      setDiscountData({
        ...discountData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const createDiscount = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      setLoading(true);
      const response = await axios.post('/api/creatediscount', discountData);
      console.log(response.data);
      router.push('/');
    } catch (error) {
      console.error('Error creating discount code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ViewDiscountCode />
      <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl mb-6 text-center font-bold">
          Create Discount Code
        </h1>
        <form onSubmit={createDiscount} className="space-y-6">
          <div className="">
            <label htmlFor="code" className="block mb-2 font-medium">
              Discount Code:
            </label>
            <input
              type="text"
              name="code"
              value={discountData.code}
              onChange={handleChange}
              required
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-blue-600 px-4 focus:border-2 outline-none"
            />
          </div>
          <div className="py-3">
            <label htmlFor="value" className="block mb-2 font-medium">
              Value:
            </label>
            <input
              type="number"
              name="value"
              value={discountData.value}
              onChange={handleChange}
              required
              className="w-full h-[50px] border-[1px] rounded-lg focus:border-blue-600 px-4 focus:border-2 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {loading ? 'Creating...' : 'Create Discount Code'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateDiscountCode;
