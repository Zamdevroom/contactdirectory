import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/authcontext';
import { useState } from 'react';

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const { signup } = useAuth();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage('');
    try {
      const response = await signup(data.firstname, data.lastname, data.username, data.password);
      if (response?.message === 'User created successfully') {
        setIsError(false);
        setMessage('Account created! Redirecting to sign in...');
        setTimeout(() => nav('/'), 1500);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'Failed to create account. Username may already exist.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-8">Join the contact directory</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="First name"
              {...register('firstname', { required: true })}
              required
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Last name"
              {...register('lastname', { required: true })}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Choose a username"
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
              placeholder="Choose a password"
              {...register('password', { required: true })}
              required
            />
          </div>
          {message && (
            <p className={`text-sm text-center ${isError ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
