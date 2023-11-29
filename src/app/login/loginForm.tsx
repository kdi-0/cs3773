'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import axios from 'axios';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const Login = async () => {
    // const data = {
    //   email: user.email,
    //   password: user.password,
    // };

    // try {
    //   const response = await axios.post('/api/login', data);
    //   console.log(response);

    //   if (response.status === 200) {
    //     router.push('/dashboard');
    //   } else {
    //     console.log('Login failed');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const res = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: true,
        callbackUrl: '/',
      });

      if (res.error) {
        console.log('signIn error');
      }

      router.replace('/');
    } catch {
      console.log('Error while signing in');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-10 rounded-lg shadow-lg flex flex-col">
        <h1 className="text-xl font-medium mb-4">Sign In</h1>
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
          type="text"
          className="p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={Login}
          className="p-2 border bg-purple-600 text-white border-gray-300 mt-2 mb-4 focus:outline-none focus:border-gray-600"
        >
          Login Now
        </button>
        <Link
          href="/register"
          className="text-sm text-center mt-5 text-neutral-600"
        >
          Don't have an account? Sign up.
        </Link>
        <Link href="/" className="text-center mt-2">
          Home
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
