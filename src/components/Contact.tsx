import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            If you have any questions or feedback, please don't hesitate to contact us. We're here to help!
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 mb-12 lg:mb-0">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">Address</h3>
                  <p className="text-gray-600">
                    Kolar Road, Bhopal,<br />
                    Madhya Pradesh, India<br />
                    462003
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">Phone</h3>
                  <p className="text-gray-600">+91 877 060 7999</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">Email</h3>
                  <p className="text-gray-600">adhipatya.saxena@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 lg:pl-12">
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                  {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors ${
                    isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};