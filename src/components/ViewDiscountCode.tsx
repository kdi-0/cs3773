import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewDiscountCode = () => {
  const [discountCodes, setDiscountCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of discount codes when the component mounts
    const fetchDiscountCodes = async () => {
      try {
        const response = await axios.get('/api/getdiscountcodes');

        // Check if response.data is an array before setting state
        if (Array.isArray(response.data.data)) {
          setDiscountCodes(response.data.data);
        } else {
          console.error('Invalid data received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching discount codes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountCodes();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h1 className="text-3xl mb-6 text-center font-bold">
        View Discount Codes
      </h1>
      {loading ? (
        <p className="text-center">Loading discount codes...</p>
      ) : (
        <ul className="space-y-4">
          {discountCodes.map((code) => (
            <li key={code.DISCOUNT_ID}>
              <p className="font-medium">Code: {code.DISCOUNT_CODE}</p>
              <p className="font-medium">Value: {code.DISCOUNT_VALUE}</p>
              {/* Add more information about the discount code if needed */}
              <hr className="my-2" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewDiscountCode;
