'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTableRow from '@/src/components/TableRow';
import UserOrdersModal from '@/src/components/UserOrders';

interface User {
  USER_ID: number;
  USER_NAME: string;
  USER_EMAIL: string;
  USER_PASSWORD: string;
  ROLE: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const usersPerPage = 15;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/accounts/getaccounts');
        const usersData = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        // Filter users based on the search input
        const filteredUsers = usersData.filter((user) =>
          user.USER_NAME.toLowerCase().includes(searchInput.toLowerCase())
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchInput]);

  const handleUpdateUser = async (userId: number, newCredentials: any) => {
    try {
      const updatedData = { ...newCredentials, USER_ID: userId };

      console.log('Updating user:', userId, JSON.stringify(updatedData));

      const response = await axios.put(
        `/api/accounts/getaccounts`,
        updatedData
      );

      if (response.status === 200) {
        const updatedUsers = await axios.get('/api/accounts/getaccounts');

        setUsers(() => {
          const updatedUsersArray = Array.isArray(updatedUsers.data.data)
            ? updatedUsers.data.data
            : [];

          const sortedUsers = [...updatedUsersArray];
          if (sortField) {
            sortedUsers.sort((a, b) => {
              const valueA = a[sortField];
              const valueB = b[sortField];

              if (typeof valueA === 'string' && typeof valueB === 'string') {
                return valueA.localeCompare(valueB);
              } else if (
                typeof valueA === 'number' &&
                typeof valueB === 'number'
              ) {
                return valueA - valueB;
              } else {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
              }
            });

            if (sortOrder === 'desc') {
              sortedUsers.reverse();
            }
          }

          return [...sortedUsers];
        });
      } else {
        console.error(
          'Error updating user. Server returned:',
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleSort = (field: string) => {
    setSortOrder((prevOrder) =>
      sortField === field ? (prevOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    );
    setSortField(field);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      handleSort(name);
    } else {
      setSortField(null);
      setSortOrder('asc');
    }

    const sortedUsers = [...users];
    if (sortField) {
      sortedUsers.sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        } else {
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        }
      });

      if (sortOrder === 'desc') {
        sortedUsers.reverse();
      }
    }

    setUsers(sortedUsers);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const onViewOrders = (userId: number) => {
    console.log(`View Orders clicked for user with ID: ${userId}`);
    setSelectedUserId(userId);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Table</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => handleSort('USER_ID')}
            >
              User ID
            </th>
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => handleSort('USER_NAME')}
            >
              User Name
            </th>
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => handleSort('USER_EMAIL')}
            >
              User Email
            </th>
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => handleSort('USER_PASSWORD')}
            >
              User Password
            </th>
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => handleSort('ROLE')}
            >
              Role
            </th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <UserTableRow
              key={user.USER_ID}
              user={user}
              onUpdateUser={handleUpdateUser}
              onViewOrders={onViewOrders}
            />
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <label className="inline-flex items-center mr-4">
          <input
            type="checkbox"
            name="USER_ID"
            checked={sortField === 'USER_ID'}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Sort by User ID</span>
        </label>
        <label className="inline-flex items-center mr-4">
          <input
            type="checkbox"
            name="USER_NAME"
            checked={sortField === 'USER_NAME'}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Sort by User Name</span>
        </label>

        {/* Add search input */}
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search by User Name"
          className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="mt-4">
        {Array.from(
          { length: Math.ceil(users.length / usersPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 mx-1 border ${currentPage === index + 1
                  ? 'bg-gray-500 text-white'
                  : 'bg-white text-gray-500'
                }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {selectedUserId && (
        <UserOrdersModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
};

export default UserTable;
