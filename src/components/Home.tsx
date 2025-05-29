import React, { useState, useEffect } from 'react';

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative pt-16">
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>
      
      <div className="z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
          Welcome to AskProperty AI
        </h1>
        <p className="text-xl sm:text-2xl text-white mb-12 max-w-2xl mx-auto animate-fadeIn animation-delay-300">
          Find the perfect property with our AI-powered assistance.
        </p>
        <button 
          onClick={() => 
          { const aboutSection = document.getElementById('about');
            if (aboutSection) 
            {
              // Add click animation
              aboutSection.classList.add('animate-pulse-scale');
              
              // Custom smooth scroll implementation with 1.5s duration
              const startPosition = window.pageYOffset;
              const targetPosition = aboutSection.offsetTop - 100; // Adjust offset if needed
              const distance = targetPosition - startPosition;
              const startTime = performance.now();
              const duration = 1500; // 1.5 seconds

              const smoothScroll = (currentTime: number) => 
              {
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                window.scrollTo(0, startPosition + distance * progress);
                
                if (timeElapsed < duration) {
                  requestAnimationFrame(smoothScroll);
                }
              };

              requestAnimationFrame(smoothScroll);

              // Remove animation class after completion
              setTimeout(() => 
                {
                aboutSection.classList.remove('animate-pulse-scale');
                }, 1500);
            }
          }}
          className="bg-blue-600 hover:bg-blue-800 text-white text-lg font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 animate-fadeIn animation-delay-500"
          >
          Learn More
        </button>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-gray-400 bg-opacity-50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      <button
        className="absolute left-4 top-1/2 z-10 bg-white bg-opacity-25 hover:bg-opacity-50 rounded-full p-2 transform -translate-y-1/2 transition-all duration-300"
        onClick={prevSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 z-10 bg-white bg-opacity-25 hover:bg-opacity-50 rounded-full p-2 transform -translate-y-1/2 transition-all duration-300"
        onClick={nextSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};