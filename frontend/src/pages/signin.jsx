import { set, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/authcontext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Signin = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      await login(data.username, data.password);
      nav('/dashboard');
      setMessage('');
    } catch (error) {
      setMessage('Username or Password is incorrect');
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className='md:flex-1 flex-initial'>
        <h1 className='text-3xl font-bold text-center mt-20'>Sign In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} class="max-w-xl mx-auto py-20">
          <div class="mb-5">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Username:</label>
            <input type="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username"
              {...register('username', { required: true })} required />
          </div>
          <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Password:</label>
            <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password"{...register('password', { required: true })} required />
          </div>
          <div class="flex items-start mb-5">
          </div>
          <div>
            {message && <p class="text-red-500 text-sm">{message}</p>}
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Me In</button>
          <a href="/signup" class="block mt-5 text-center text-blue-700 dark:text-blue-400">Don't have an account? Sign up</a>
        </form>
      </div>
    </div>
  );
};

export default Signin;
