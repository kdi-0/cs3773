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
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  useEffect(() => {
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

  const sortByOrderID = () => {
    setSortBy('orderID');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('ORDER_ID', sortOrder);
  };

  const sortByShippingAddress = () => {
    setSortBy('shippingAddress');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('ORDER_SHIPPING_ADDRESS', sortOrder);
  };

  const sortByCustomerName = () => {
    setSortBy('customerName');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('Customer_Name', sortOrder);
  };

  const sortByPhoneNumber = () => {
    setSortBy('phoneNumber');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('Customer_PhoneNum', sortOrder);
  };

  const sortByProductIDs = () => {
    setSortBy('productIDs');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('PRODUCT_ID', sortOrder);
  };

  const sortByProductQuantities = () => {
    setSortBy('productQuantities');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('PRODUCT_QUANTITY', sortOrder);
  };

  const sortByTotalPrice = () => {
    setSortBy('totalPrice');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('ORDER_TOTAL_PRICE', sortOrder);
  };

  const sortByUserName = () => {
    setSortBy('userName');
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    sortOrders('User_Name', sortOrder);
  };

  const handleToggleCurrentOrders = () => {
    setShowCurrentOrders((prev) => !prev);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleModifyClick = (order) => {
    setSelectedOrder(order);
    // Open your modification modal or form here
    // You can use a state variable to control the visibility of the modal
  };

  const handleDeleteClick = async (order) => {
    try {
      // Send a DELETE request to your API to delete the order
      await axios.delete('/api/orders', { data: { ORDER_ID: order.ORDER_ID } });

      // Refetch the orders after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
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
        <button
          className={`text-blue-500 ${sortBy === 'orderID' ? 'font-bold' : ''}`}
          onClick={sortByOrderID}
        >
          Sort by Order ID
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'shippingAddress' ? 'font-bold' : ''
          }`}
          onClick={sortByShippingAddress}
        >
          Sort by Shipping Address
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'customerName' ? 'font-bold' : ''
          }`}
          onClick={sortByCustomerName}
        >
          Sort by Customer Name
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'phoneNumber' ? 'font-bold' : ''
          }`}
          onClick={sortByPhoneNumber}
        >
          Sort by Phone Number
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'productIDs' ? 'font-bold' : ''
          }`}
          onClick={sortByProductIDs}
        >
          Sort by Product IDs
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'productQuantities' ? 'font-bold' : ''
          }`}
          onClick={sortByProductQuantities}
        >
          Sort by Product Quantities
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'totalPrice' ? 'font-bold' : ''
          }`}
          onClick={sortByTotalPrice}
        >
          Sort by Total Price
        </button>
        <button
          className={`text-blue-500 ${
            sortBy === 'userName' ? 'font-bold' : ''
          }`}
          onClick={sortByUserName}
        >
          Sort by User Name
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

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th
              className={`border border-gray-300 px-4 py-2 ${
                sortBy === 'orderID' ? 'bg-gray-200' : ''
              }`}
              onClick={sortByOrderID}
            >
              Order ID
            </th>
            <th
              className={`border border-gray-300 px-4 py-2 ${
                sortBy === 'date' ? 'bg-gray-200' : ''
              }`}
              onClick={sortByDateAsc}
            >
              Date
            </th>
            <th
              className={`border border-gray-300 px-4 py-2 ${
                sortBy === 'shippingAddress' ? 'bg-gray-200' : ''
              }`}
              onClick={sortByShippingAddress}
            >
              Shipping Address
            </th>
            <th
              className={`border border-gray-300 px-4 py-2 ${
                sortBy === 'customerName' ? 'bg-gray-200' : ''
              }`}
              onClick={sortByCustomerName}
            >
              Customer Name
            </th>
            <th
              className={`border border-gray-300 px-4 py-2 ${
                sortBy === 'phoneNumber' ? 'bg-gray-200' : ''
              }`}
              onClick={sortByPhoneNumber}
            >
              Phone Number
            </th>
            <th
              className={`border border-gray-300 px-4 py-2 ${
                sortBy === 'productIDs' ? 'bg-gray-200' : ''
              }`}
              onClick={sortByProductIDs}
            >
              Product IDs
            </th>
            <th
              className={`border border-gray-300 px-4 py-2 ${
                sortBy === 'productQuantities' ? 'bg-gray-200' : ''
              }`}
              onClick={sortByProductQuantities}
            >
              Product Quantities
            </th>
            <th
              className={`border border-gray-300 px-4 py-2 ${
                sortBy === 'totalPrice' ? 'bg-gray-200' : ''
              }`}
              onClick={sortByTotalPrice}
            >
              Total Price
            </th>
            <th
              className={`border border-gray-300 px-4 py-2 ${
                sortBy === 'userName' ? 'bg-gray-200' : ''
              }`}
              onClick={sortByUserName}
            >
              User Name
            </th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
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
                <tr key={order.ORDER_ID} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    {order.ORDER_ID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.ORDER_DATE).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.ORDER_SHIPPING_ADDRESS}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.Customer_Name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.Customer_PhoneNum}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.PRODUCT_ID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.PRODUCT_QUANTITY}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.ORDER_TOTAL_PRICE}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {Array.isArray(users) && users.length > 0 ? (
                      <p>
                        {users.find((user) => user.USER_ID === order.USER_ID)
                          ?.USER_NAME || 'N/A'}
                      </p>
                    ) : (
                      <p>User Name not available</p>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => handleDeleteClick(order)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={10} className="border border-gray-300 px-4 py-2">
                No orders available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
