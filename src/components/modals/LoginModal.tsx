import React, { useState } from 'react';
import { useModals } from '../../hooks/useModals';

const LoginModal: React.FC = () => {
  const { isModalOpen, closeModal, openModal } = useModals();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    // Here you would typically handle the login logic
    closeModal();
  };

  const handleOpenSignup = () => {
    closeModal();
    setTimeout(() => {
      // Open signup modal after login modal closes
      openModal('signup');
    }, 300);
  };

  if (!isModalOpen('login')) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
        <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <button 
            onClick={() => closeModal()}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="login-email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="login-password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            <p className="mt-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
              Forgot password?
            </p>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
          
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={handleOpenSignup}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;