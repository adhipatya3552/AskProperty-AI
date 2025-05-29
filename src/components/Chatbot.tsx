// src/components/Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, SendHorizontal } from 'lucide-react';
import { PropertyMatch } from '../types/property';
import { getChatResponse } from '../services/chatService';

type SampleProperty = {
  id: number;
  location: string;
  size: number;       // in acres
  price: number;      // in INR
  seller: string;
  contact: string;
};

// ─── Sample properties ────
const sampleProperties: SampleProperty[] = [
  { id: 1, location: 'Bangalore, Karnataka',  size: 3.0, price: 8_50_00_000,  seller: 'Ramesh Sharma', contact: '9876543210' },
  { id: 2, location: 'Mumbai, Maharashtra',   size: 2.0, price: 12_50_00_000, seller: 'Priya Desai',   contact: '9823456789' },
  { id: 3, location: 'Pune, Maharashtra',     size: 2.5, price: 9_50_00_000,  seller: 'Amit Patil',    contact: '9898765432' },
  { id: 4, location: 'Hyderabad, Telangana',  size: 4.0, price: 10_50_00_000, seller: 'Sridevi Rao',   contact: '9845671230' },
  { id: 5, location: 'Chennai, Tamil Nadu',   size: 3.5, price: 7_80_00_000,  seller: 'Vikram Iyer',   contact: '9887766554' },
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState<{
    city?: string;
    landSize?: number;
    budget?: number;
    propertyMatches?: PropertyMatch[];
    currentStep: 'intro' | 'city' | 'size' | 'budget' | 'results' | 'connection' | 'final';
  }>({ currentStep: 'intro' });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial bot message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            text: 'Hi! Welcome to AskProperty AI. Which city are you interested in buying property in? (You can choose from Bangalore, Mumbai, Pune, Hyderabad, or Chennai.)',
            sender: 'bot'
          }
        ]);
        setConversationState({ currentStep: 'city' });
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = { text: inputValue, sender: 'user' as const };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const { messages: botMsgs, newState } = await processUserInput(inputValue);
      setTimeout(() => {
        setMessages(prev => [...prev, ...botMsgs]);
        setConversationState(newState);
        setIsTyping(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { text: 'Sorry, something went wrong. Please try again.', sender: 'bot' }
      ]);
      setIsTyping(false);
    }
  };

  const processUserInput = async (input: string) => {
    const botMessages: Array<{ text: string; sender: 'bot' }> = [];
    const newState = { ...conversationState };

    switch (conversationState.currentStep) {
      case 'city': {
        const validCities = ['bangalore','mumbai','pune','hyderabad','chennai'];
        const cityInput = input.trim().toLowerCase();
        if (validCities.includes(cityInput)) {
          newState.city = cityInput;
          newState.currentStep = 'size';
          botMessages.push({
            text: 'Great choice! How much land size are you looking for (in acres)?',
            sender: 'bot'
          });
        } else {
          botMessages.push({
            text: 'Please select a city from Bangalore, Mumbai, Pune, Hyderabad, or Chennai.',
            sender: 'bot'
          });
        }
        break;
      }

      case 'size': {
        const sizeInput = parseFloat(input.replace(/[^0-9.]/g, ''));
        if (!isNaN(sizeInput) && sizeInput > 0) {
          newState.landSize = sizeInput;
          newState.currentStep = 'budget';
          botMessages.push({
            text: "Perfect! And what's your approximate budget for the property? (in crores)",
            sender: 'bot'
          });
        } else {
          botMessages.push({
            text: 'Please enter a valid land size in acres.',
            sender: 'bot'
          });
        }
        break;
      }

      case 'budget': {
        const numOnly = input.replace(/[^0-9.]/g, '');
        const budgetCrores = parseFloat(numOnly);
        if (!isNaN(budgetCrores) && budgetCrores > 0) {
          newState.budget = budgetCrores;
          newState.currentStep = 'results';

          // Filter sampleProperties
          const matches = sampleProperties
            .filter(p =>
              p.location.toLowerCase().includes(newState.city!)
              && p.size >= (newState.landSize || 0)
              && p.price <= budgetCrores * 1_00_00_000
            )
            .map(p => ({
              location: p.location,
              size: p.size,
              price: `₹${p.price.toLocaleString('en-IN')}`,
              seller: p.seller,
              contact: p.contact
            }));

          newState.propertyMatches = matches;

          if (matches.length) {
            const listText = matches
              .map((m) => `Location: ${m.location}
                Size: ${m.size} acres
                Price: ${m.price}
                Seller: ${m.seller}
                Direct Contact: ${m.contact}\n`)
              .join('\n');
        
            botMessages.push({
              text: `I found ${matches.length} matching property:\n\n${listText}\nWould you like to connect with any of these sellers?`,
              sender: 'bot'
            });
          }else {
            botMessages.push({
              text: 'Sorry, I couldn’t find any properties matching all your criteria. Would you like to try a different budget or city?',
              sender: 'bot'
            });
          }
        } else {
          botMessages.push({ text: 'Please enter a valid budget in crores.', sender: 'bot' });
        }
        break;
      }

      case 'results': {
        const inputLower = input.trim().toLowerCase();
        const matches = newState.propertyMatches || [];
      
        if (inputLower === 'yes' || inputLower === 'y') {
          if (matches.length > 0) {
            // Show all contacts directly
            const contacts = matches
              .map(m => `Location: ${m.location}\nSeller: ${m.seller}\nContact: ${m.contact}`)
              .join('\n\n');
            
            botMessages.push({
              text: `Great! Here are the direct contacts:\n\n${contacts}`,
              sender: 'bot'
            });
          } else {
            botMessages.push({
              text: 'No properties available for connection',
              sender: 'bot'
            });
          }
          newState.currentStep = 'connection';
        } else {
          botMessages.push({
            text: 'Would you like to try different search criteria?',
            sender: 'bot'
          });
          newState.currentStep = 'intro';
        }
        break;
      }

      case 'connection': {
        // Ask final question
        botMessages.push({ 
          text: 'Is there anything else I can help you with regarding real estate properties?', 
          sender: 'bot' 
        });
        // Set next step to handle response
        newState.currentStep = 'final';
        break;
      }

      // In the 'final' case block
      case 'final': {
        const inputLower = input.trim().toLowerCase();
        if (inputLower === 'no' || inputLower === 'n') {
          // Schedule page reload after 1.5 seconds
          setTimeout(() => window.location.reload(), 1500);
          botMessages.push({
            text: 'Thank you for using AskProperty AI!',
            sender: 'bot'
          });
        } else if (inputLower === 'yes' || inputLower === 'y') {
          // Reset conversation state to start fresh
          Object.assign(newState, {
            currentStep: 'city',
            city: undefined,
            landSize: undefined,
            budget: undefined,
            propertyMatches: undefined,
          });
          botMessages.push({
            text: 'Hi! Welcome to AskProperty AI. Which city are you interested in buying property in? (You can choose from Bangalore, Mumbai, Pune, Hyderabad, or Chennai.)',
            sender: 'bot'
          });
        } else {
          botMessages.push({
            text: 'How can I assist you further?',
            sender: 'bot'
          });
        }
        break;
      }

      default: {
        // Fallback to AI
        const ai = await getChatResponse({ message: input });
        botMessages.push({ text: ai.reply, sender: 'bot' });
        newState.currentStep = 'city';
      }
    }

    return { messages: botMessages, newState };
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat window - modified with bottom-20 and flex layout */}
      <div
        className={`absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform origin-bottom-right flex flex-col ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px', transformOrigin: 'bottom right' }}
      >
        {/* Chat header */}
        <div className="bg-blue-600 p-4 text-white font-semibold flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          <span>AskProperty AI Chat</span>
        </div>

        {/* Chat messages */}
        <div className="p-4 flex-1 overflow-y-auto">
          {messages.map((message, idx) => (
            <div key={idx} className={`mb-4 max-w-[75%] ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}>
              <div className={`p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}>
                {message.text.split('\n').map((line, i) => <p key={i} className={i>0?'mt-1':''}>{line}</p>)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="mb-4 max-w-[75%] mr-auto">
              <div className="p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping || !inputValue.trim()}
              className={`px-4 py-2 bg-blue-600 text-white rounded-r-lg flex items-center justify-center ${
                isTyping || !inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              <SendHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
