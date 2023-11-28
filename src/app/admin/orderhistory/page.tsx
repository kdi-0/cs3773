'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [showCurrentOrders, setShowCurrentOrders] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, usersResponse] = await axios.all([
          axios.get('/api/orders'),
          axios.get('/api/accounts/getaccounts'),
        ]);

        setOrders(ordersResponse.data.data);
        setUsers(usersResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sortOrders = (criteria, order) => {
    const sortedOrders = [...orders];
    sortedOrders.sort((a, b) => {
      const valueA = a[criteria];
      const valueB = b[criteria];

      if (order === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setOrders(sortedOrders);
  };

  const sortByDateAsc = () => {
    setSortBy('date');
    setSortOrder('asc');
    sortOrders('ORDER_DATE', 'asc');
  };

  const sortByDateDesc = () => {
    setSortBy('date');
    setSortOrder('desc');
    sortOrders('ORDER_DATE', 'desc');
  };

  const sortByCustomer = () => {
    setSortBy('customer');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('Customer_Name', sortOrder);
  };

  const sortByOrderSize = () => {
    setSortBy('orderSize');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('ORDER_TOTAL_PRICE', sortOrder);
  };

  const handleToggleCurrentOrders = () => {
    setShowCurrentOrders((prev) => !prev);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {showCurrentOrders ? 'Current Orders' : 'Order History'}
      </h2>

      {/* Search input */}
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search by User Name"
        className="border rounded px-2 py-1 mb-4"
      />

      <div className="flex mb-4 space-x-4">
        <button
          className={`text-blue-500 ${
            sortBy === 'date' && sortOrder === 'asc' ? 'font-bold' : ''
          }`}
          onClick={sortByDateAsc}
        >
          Sort by Date Asc
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'date' && sortOrder === 'desc' ? 'font-bold' : ''
          }`}
          onClick={sortByDateDesc}
        >
          Sort by Date Desc
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'customer' ? 'font-bold' : ''
          }`}
          onClick={sortByCustomer}
        >
          Sort by Customer
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'orderSize' ? 'font-bold' : ''
          }`}
          onClick={sortByOrderSize}
        >
          Sort by Order Size
        </button>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showCurrentOrders}
            onChange={handleToggleCurrentOrders}
            className="mr-2"
          />
          Show Current Orders
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders
            .filter((order) =>
              showCurrentOrders ? order.IS_CURRENT_ORDER : true
            )
            .filter(
              (order) =>
                users
                  .find((user) => user.USER_ID === order.USER_ID)
                  ?.USER_NAME.toLowerCase()
                  .includes(searchInput.toLowerCase())
            )
            .map((order) => (
              <div
                key={order.ORDER_ID}
                className="border p-4 rounded-md shadow-md bg-white"
              >
                <p className="text-lg font-semibold mb-2">
                  Order ID: {order.ORDER_ID}
                </p>
                <p>Date: {new Date(order.ORDER_DATE).toLocaleString()}</p>
                <p>Shipping Address: {order.ORDER_SHIPPING_ADDRESS}</p>
                <p>Customer Name: {order.Customer_Name}</p>
                <p>Customer Phone Number: {order.Customer_PhoneNum}</p>
                {order.PRODUCT_ID && order.PRODUCT_ID.length > 0 ? (
                  <>
                    <p>Product IDs: {order.PRODUCT_ID.join(', ')}</p>
                    <p>
                      Product Quantities: {order.PRODUCT_QUANTITY.join(', ')}
                    </p>
                  </>
                ) : (
                  <p>No products in the order</p>
                )}
                {order.ORDER_TOTAL_PRICE !== undefined ? (
                  <p>Total Price: ${order.ORDER_TOTAL_PRICE.toFixed(2)}</p>
                ) : (
                  <p>Total Price not available</p>
                )}

                {/* Find and display the corresponding user name */}
                {Array.isArray(users) && users.length > 0 ? (
                  <p>
                    User Name:{' '}
                    {users.find((user) => user.USER_ID === order.USER_ID)
                      ?.USER_NAME || 'N/A'}
                  </p>
                ) : (
                  <p>User Name not available</p>
                )}
              </div>
            ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
};
export default OrderHistory;