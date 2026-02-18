import React from 'react';
import { FaChevronCircleRight, FaMapMarkerAlt } from 'react-icons/fa';

const services = [
  { id: 1, title: "Driver", loc: "Patia, Bhubaneswar", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400", icon: "🚗" },
  { id: 2, title: "Nurse", loc: "Patia, Bhubaneswar", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400", icon: "👩‍⚕️" },
  { id: 3, title: "Beauty Parlor", loc: "Patia, Bhubaneswar", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400", icon: "💅" },
  { id: 4, title: "Electrician", loc: "Patia, Bhubaneswar", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400", icon: "⚡" },
];

const PopularServices = () => {
  return (
    <section className="bg-white py-[30px]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Popular Service</h2>
          <a href="#" className="flex items-center text-emerald-500 font-bold gap-2 hover:underline">
            View All Service <FaChevronCircleRight className="text-xl" />
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="group relative bg-white rounded-[10px] overflow-hidden shadow-md border border-gray-100 h-[400px]">
              
              {/* Card Image */}
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-full object-cover" 
              />

              {/* Card Overlay (The part that moves) */}
              <div className="card__overlay">
                <div className="card__header">
                  {/* The SVG Arc from your code */}
                  <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 40 80 c 22 0 40 -22 40 -40 v 40 Z"></path>
                  </svg>                     
                  
                  <div className="bg-emerald-50 p-2 rounded-xl text-2xl w-12 h-12 flex items-center justify-center">
                    {service.icon}
                  </div>
                  
                  <div className="card__header-text">
                    <h3 className="text-emerald-600 font-bold text-lg">{service.title}</h3>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <FaMapMarkerAlt /> {service.loc}
                    </span>
                  </div>
                </div>
                
                {/* Description/Enquire (Revealed on Hover) */}
                <div className="card__description">
                  <a href="#" className="inline-block mt-4 text-sm font-black text-[#003d29] uppercase tracking-tighter">
                    Enquire Now
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;