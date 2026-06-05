import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/authcontext';
import { useState } from 'react';

const Signin = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage('');
    const success = await login(data.username, data.password);
    if (success) {
      nav('/dashboard');
    } else {
      setMessage('Username or password is incorrect');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Contact Directory</h1>
        <p className="text-center text-gray-500 mb-8">Sign in to your account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your username"
              {...register('username', { required: true })}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter your password"
              {...register('password', { required: true })}
              required
            />
          </div>
          {message && <p className="text-red-500 text-sm text-center">{message}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
