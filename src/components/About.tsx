import React, { useEffect, useRef } from 'react';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      },
      { threshold: 0.1 }
    );

    
    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  
  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 bg-white opacity-0 transition-all duration-1000 scroll-mt-24"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ABOUT US</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are a forward-thinking team passionate about transforming the real estate experience through AI innovation. Our mission is to make property transactions faster, easier, and smarter by integrating cutting-edge technology into everyday processes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With our AskProperty AI (AI-Powered Real Estate Chatbot), we aim to simplify communication between buyers, sellers, and agents. Built using the OpenRouter API, our chatbot provides instant, 24/7 responses to property inquiries, and schedules visits — all in real-time. We're committed to bridging the gap between real estate and technology, making digital interaction more efficient, accessible, and user-friendly for everyone.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="About Us Illustration" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
      </div>
      </div>
    </section>
  );
};