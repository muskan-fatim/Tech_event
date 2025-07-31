'use client'
import { useState } from 'react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
      <form className="flex flex-col gap-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 rounded-md transition"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

