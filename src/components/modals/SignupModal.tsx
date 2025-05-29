import React, { useState } from 'react';
import { useModals } from '../../hooks/useModals';

const SignupModal: React.FC = () => {
  const { isModalOpen, closeModal, openModal } = useModals();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [passwordError, setPasswordError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear password error when user types
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    console.log('Signup form submitted:', formData);
    // Here you would typically handle the signup logic
    closeModal();
  };

  const handleOpenLogin = () => {
    closeModal();
    setTimeout(() => {
      // Open login modal after signup modal closes
      openModal('login');
    }, 300);
  };

  if (!isModalOpen('signup')) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
        <div className="flex justify-between items-center p-6 bg-gray-50 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
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
            <label htmlFor="signup-name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="signup-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="signup-email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="signup-password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="signup-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Create a password"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="signup-confirm-password" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="signup-confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                passwordError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
            />
            {passwordError && (
              <p className="mt-1 text-sm text-red-500">{passwordError}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
          
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={handleOpenLogin}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;