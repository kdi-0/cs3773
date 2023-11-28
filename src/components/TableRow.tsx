import React, { useState } from 'react';

interface UserTableRowProps {
  user: {
    USER_ID: number;
    USER_NAME: string;
    USER_EMAIL: string;
    USER_PASSWORD: string;
    ROLE: string;
  };
  onUpdateUser: (userId: number, newCredentials: any) => void;
  onViewOrders: (userId: number) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onUpdateUser,
  onViewOrders,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    USER_ID: user.USER_ID,
    USER_NAME: user.USER_NAME,
    USER_EMAIL: user.USER_EMAIL,
    USER_PASSWORD: user.USER_PASSWORD,
    ROLE: user.ROLE,
  });

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateUserClick = () => {
    console.log('Updating user:', updatedUserData.USER_ID, updatedUserData);
    onUpdateUser(updatedUserData.USER_ID, updatedUserData);
    setIsModalOpen(false);
  };

  const handleViewOrdersClick = () => {
    onViewOrders(user.USER_ID);
  };

  return (
    <>
      <tr key={user.USER_ID} className="bg-blue-100 hover:bg-blue-200">
        <td className="border px-4 py-2">{user.USER_ID}</td>
        <td className="border px-4 py-2">{user.USER_NAME}</td>
        <td className="border px-4 py-2">{user.USER_EMAIL}</td>
        <td className="border px-4 py-2">{user.USER_PASSWORD}</td>
        <td className="border px-4 py-2">{user.ROLE}</td>
        <td className="border px-4 py-2">
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Update
          </button>
          <button
            onClick={handleViewOrdersClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            View Orders
          </button>
        </td>
      </tr>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-50"
            onClick={handleModalClose}
          ></div>
          <div className="relative bg-white p-8 rounded shadow-md z-10">
            <h2 className="text-2xl font-bold mb-4">Update User</h2>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              name="USER_NAME"
              value={updatedUserData.USER_NAME}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label htmlFor="userEmail">User Email:</label>
            <input
              type="text"
              id="userEmail"
              name="USER_EMAIL"
              value={updatedUserData.USER_EMAIL}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label htmlFor="userPassword">User Password:</label>
            <input
              type="text"
              id="userPassword"
              name="USER_PASSWORD"
              value={updatedUserData.USER_PASSWORD}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <label htmlFor="userRole">User Role:</label>
            <input
              type="text"
              id="userRole"
              name="ROLE"
              value={updatedUserData.ROLE}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleUpdateUserClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update User
            </button>
            <button
              onClick={handleModalClose}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTableRow;
