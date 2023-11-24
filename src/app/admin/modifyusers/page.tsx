"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTableRow from '@/src/components/TableRow';

interface User {
    USER_ID: number;
    USER_NAME: string;
    USER_EMAIL: string;
    USER_PASSWORD: string;
    ROLE: string;
    // Add other properties if needed
}

const UserTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const usersPerPage = 15;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/accounts/getaccounts');
                // Check if response.data.data is an array, otherwise use an empty array
                setUsers(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdateUser = async (userId: number, newCredentials: any) => {
        try {
            const updatedData = { ...newCredentials, USER_ID: userId };

            console.log('Updating user:', userId, JSON.stringify(updatedData));

            const response = await axios.put(`/api/accounts/getaccounts`, updatedData);

            if (response.status === 200) {
                // Refetch the users after the update
                const updatedUsers = await axios.get('/api/accounts/getaccounts');

                setUsers((prevUsers) => {
                    const updatedUsersArray = Array.isArray(updatedUsers.data.data) ? updatedUsers.data.data : [];

                    // Sort the updated array
                    const sortedUsers = [...updatedUsersArray];
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

                    return [...sortedUsers];
                });
            } else {
                console.error('Error updating user. Server returned:', response.status, response.data);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleSort = (field: string) => {
        // If clicking on the same field, toggle the sortOrder
        setSortOrder((prevOrder) => (sortField === field ? (prevOrder === 'asc' ? 'desc' : 'asc') : 'asc'));
        setSortField(field);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;

        // Update the sorting state based on the checkbox
        if (checked) {
            handleSort(name);
        } else {
            // If the checkbox is unchecked, reset the sorting
            setSortField(null);
            setSortOrder('asc');
        }

        // Sort the users locally based on the updated sorting state
        const sortedUsers = [...users];
        if (sortField) {
            sortedUsers.sort((a, b) => {
                const valueA = a[sortField];
                const valueB = b[sortField];

                // Compare values based on data type
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return valueA.localeCompare(valueB);
                } else if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return valueA - valueB;
                } else {
                    // Fallback to basic comparison for other data types
                    return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
                }
            });

            if (sortOrder === 'desc') {
                sortedUsers.reverse();
            }
        }

        // Set the state with the sorted array
        setUsers(sortedUsers);
    };
    // Calculate the indexes of the users to display on the current page
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
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('USER_ID')}>
                            User ID
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('USER_NAME')}>
                            User Name
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('USER_EMAIL')}>
                            User Email
                        </th>
                        <th
                            className="py-2 px-4 border cursor-pointer"
                            onClick={() => handleSort('USER_PASSWORD')}
                        >
                            User Password
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('ROLE')}>
                            Role
                        </th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user) => (
                        <UserTableRow key={user.USER_ID} user={user} onUpdateUser={handleUpdateUser} />
                    ))}
                </tbody>
            </table>

            {/* Checkbox for sorting */}
            <div className="mt-4">
                <label className="inline-flex items-center mr-4">
                    <input
                        type="checkbox"
                        name="USER_ID"
                        checked={sortField === 'USER_ID'}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Sort by User Name</span>
                </label>
                <label className="inline-flex items-center mr-4">
                    <input
                        type="checkbox"
                        name="USER_NAME"
                        checked={sortField === 'USER_NAME'}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Sort by User ID</span>
                </label>
                {/* Add similar checkboxes for other fields */}
            </div>


            {/* Pagination */}
            <div className="mt-4">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 mx-1 border ${currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-white text-gray-500'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserTable;