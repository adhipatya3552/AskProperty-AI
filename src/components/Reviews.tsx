import React, { useEffect, useRef } from 'react';

interface Review {
  id: number;
  name: string;
  username: string;
  image: string;
  rating: number;
  review: string;
}

export const Reviews: React.FC = () => {

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

  const reviews: Review[] = [
    {
      id: 1,
      name: 'Jyoti Sinha',
      username: '@jyotisinha',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 5,
      review: 'I was searching for a home in a new city and had tons of questions. The chatbot answered everything instantly — from pricing to property details. It\'s like having a real estate assistant on call 24/7!'
    },
    {
      id: 2,
      name: 'Arjun Mehta',
      username: '@arjunmehta',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4,
      review: 'The chatbot scheduled my property visit within minutes! I didn\'t have to call or email anyone. It\'s simple, quick, and surprisingly accurate. Highly recommend for anyone exploring real estate options.'
    },
    {
      id: 3,
      name: 'Aman Raj',
      username: '@amanraj',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 5,
      review: 'I was new to real estate, but this chatbot made everything feel less overwhelming. It guided me step-by-step, and I got clear answers anytime, even late at night. Very helpful.'
    },
    {
      id: 4,
      name: 'Neha Kapoor',
      username: '@nehakapoor',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4,
      review: 'I work full-time and rarely have time to talk to agents. This chatbot was available whenever I needed it, and it handled my questions professionally. Big thumbs up!'
    }
  ];

  return (
    <section id="customer-reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Reviews</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{review.name}</h3>
                  <p className="text-gray-500 text-sm">{review.username}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};