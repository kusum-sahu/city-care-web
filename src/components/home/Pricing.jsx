import React, { useState } from 'react';
import { FaChevronCircleRight } from 'react-icons/fa';

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const plans = [
    {
      name: "Silver",
      monthlyPrice: "19.99",
      annualPrice: "199.99",
      storage: "500 GB Storage",
      users: "2 Users Allowed",
      sendLimit: "Send up to 3 GB",
      isActive: false
    },
    {
      name: "Diamond",
      monthlyPrice: "24.99",
      annualPrice: "249.99",
      storage: "1 TB Storage",
      users: "5 Users Allowed",
      sendLimit: "Send up to 10 GB",
      isActive: true
    },
    {
      name: "Gold",
      monthlyPrice: "39.99",
      annualPrice: "399.99",
      storage: "2 TB Storage",
      users: "10 Users Allowed",
      sendLimit: "Send up to 20 GB",
      isActive: false
    }
  ];

  return (
    <section className="bg-blue-50/30 py-[30px] px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Membership</h2>
          <a href="#" className="flex items-center text-teal-600 font-semibold hover:gap-3 transition-all gap-2">
            View All Membership <FaChevronCircleRight className="text-xl" />
          </a>
        </div>

        {/* Pricing Content */}
        <div className="flex flex-col items-center">
          
          {/* Custom Toggle Switch */}
          <div className="flex items-center gap-4 mb-12">
            <span className={`text-sm font-medium ${!isMonthly ? 'text-gray-800' : 'text-gray-400'}`}>Annually</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isMonthly}
                onChange={() => setIsMonthly(!isMonthly)}
              />
              <div className="w-12 h-6 bg-teal-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
            <span className={`text-sm font-medium ${isMonthly ? 'text-gray-800' : 'text-gray-400'}`}>Monthly</span>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center w-full max-w-5xl gap-0">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative transition-all duration-300 ${
                  plan.isActive 
                  ? 'bg-gradient-to-b from-[#349463] to-[#0e4227] text-white z-10 scale-110 rounded-xl py-12 shadow-2xl' 
                  : 'bg-white text-gray-600 py-10 rounded-l-xl first:rounded-l-xl last:rounded-r-xl border border-gray-100 shadow-lg'
                }`}
              >
                <div className="text-center px-8">
                  <h3 className={`text-lg font-medium mb-6 ${plan.isActive ? 'text-gray-100' : 'text-gray-400'}`}>
                    {plan.name}
                  </h3>
                  
                  <div className="text-5xl font-bold mb-8 flex justify-center items-start">
                    <span className="text-2xl mt-2">$</span>
                    {isMonthly ? plan.monthlyPrice : plan.annualPrice}
                  </div>

                  <ul className="space-y-4 mb-10 text-sm font-medium">
                    <li className={`pb-4 border-b ${plan.isActive ? 'border-white/20' : 'border-gray-100'}`}>
                      {plan.storage}
                    </li>
                    <li className={`pb-4 border-b ${plan.isActive ? 'border-white/20' : 'border-gray-100'}`}>
                      {plan.users}
                    </li>
                    <li className={`pb-4 border-b ${plan.isActive ? 'border-white/20' : 'border-gray-100'}`}>
                      {plan.sendLimit}
                    </li>
                  </ul>

                  <button className={`w-full py-3 px-6 rounded-md font-bold transition-all ${
                    plan.isActive 
                    ? 'bg-white text-teal-800 hover:bg-gray-100' 
                    : 'bg-gradient-to-r from-[#42a472] to-[#0d4629] text-white hover:opacity-90'
                  }`}>
                    Get Membership
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;