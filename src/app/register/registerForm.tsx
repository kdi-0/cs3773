'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const validateInput = (input: string, regex: RegExp) => {
    return regex.test(input);
  };

  const Register = async () => {
    const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const nameRegex = /^[a-zA-Z0-9_]{4,30}$/;
    const passwordRegex = /^[a-zA-Z0-9_]{4,16}$/;

    if (!validateInput(user.email, emailRegex)) {
      alert('Invalid email. Please enter a valid email address.');
      return;
    }

    if (!validateInput(user.name, nameRegex)) {
      alert('Invalid name. Name should be between 4 and 30 characters.');
      return;
    }

    if (!validateInput(user.password, passwordRegex)) {
      alert(
        'Invalid password. Password should be between 4 and 16 characters.'
      );
      return;
    }

    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    try {
      const response = await axios.post('/api/register', data);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      router.push('/login');
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-10 rounded-lg shadow-lg flex flex-col">
        <h1 className="text-xl font-medium mb-4">Sign Up</h1>
        <label htmlFor="" className="mb-2">
          Name
        </label>
        <input
          type="text"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="name"
          value={user.name}
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <label htmlFor="" className="mb-2">
          Email
        </label>
        <input
          type="text"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="" className="mb-2">
          Password
        </label>
        <input
          type="password"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={Register}
          className="p-2 border bg-purple-600 text-white border-gray-300 mt-2 mb-4 focus:outline-none focus:border-gray-600"
        >
          Register Now
        </button>
        <Link
          href="/login"
          className="text-sm text-center mt-5 text-neutral-600"
        >
          Already have an Account? Sign in
        </Link>
        <Link href="/" className="text-center mt-2">
          Home
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
