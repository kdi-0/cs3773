import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  ORDER_ID: number;
  ORDER_DATE: string;
  ORDER_TOTAL_PRICE: number;
  ORDER_SHIPPING_ADDRESS: string;
  Customer_Name: string;
  Customer_PhoneNum: string;
  IS_CURRENT_ORDER: boolean;
  PRODUCT_ID: number[];
  PRODUCT_QUANTITY: number[];
}

interface UserOrdersModalProps {
  userId: number;
  onClose: () => void;
}

const UserOrdersModal: React.FC<UserOrdersModalProps> = ({
  userId,
  onClose,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log(`Fetching orders for user ID: ${userId}`);
        const response = await axios.get(`/api/orders`);
        const allOrders = response.data.data;

        // Filter orders based on userId
        const filteredOrders = allOrders.filter(
          (order) => order.USER_ID === userId
        );
        console.log(filteredOrders);

        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchOrders(); // Call the function when the component mounts
  }, [userId]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-8 rounded shadow-md z-10">
        <h2 className="text-2xl font-bold mb-4">User Orders</h2>
        {orders.map((order, index) => (
          <div key={order.ORDER_ID || index} className="mb-4">
            <h3 className="text-lg font-bold mb-2">
              Order ID: {order.ORDER_ID || 'N/A'}
            </h3>
            <ul>
              <li>Order Date: {order.ORDER_DATE || 'N/A'}</li>
              <li>
                Total Price: ${order.ORDER_TOTAL_PRICE?.toFixed(2) || 'N/A'}
              </li>
              <li>Shipping Address: {order.ORDER_SHIPPING_ADDRESS || 'N/A'}</li>
              <li>Customer Name: {order.Customer_Name || 'N/A'}</li>
              <li>Customer Phone Number: {order.Customer_PhoneNum || 'N/A'}</li>
              <li>Is Current Order: {order.IS_CURRENT_ORDER ? 'Yes' : 'No'}</li>
              <li>
                Products:
                <ul>
                  {order.PRODUCT_ID?.map((productId, index) => (
                    <li key={index}>
                      Product ID: {productId}, Quantity:{' '}
                      {order.PRODUCT_QUANTITY?.[index] || 'N/A'}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        ))}
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserOrdersModal;
