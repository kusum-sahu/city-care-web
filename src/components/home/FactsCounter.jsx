import React from 'react';

const FactsCounter = () => {
  const stats = [
    { id: 1, count: "40 K", symbol: "+", label: "COMPLETED JOBS", color: "text-[#349463]" },
    { id: 2, count: "31 K", symbol: "+", label: "SATISFIED CUSTOMERS", color: "text-[#7b61ff]" },
    { id: 3, count: "4 K", symbol: "+", label: "MONTHLY JOB REQUEST", color: "text-[#f44336]" },
    { id: 4, count: "95", symbol: "%", label: "REPEAT CUSTOMERS", color: "text-[#ff9800]" },
  ];

  return (
    <section className="bg-[#e2f0f9] py-[30px]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-12">Some Facts about Our Service</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className={`text-5xl font-bold ${item.color} flex items-baseline gap-1`}>
                {item.count} 
                <span className="text-3xl font-light">{item.symbol}</span>
              </div>
              <p className="text-gray-500 text-xs font-bold tracking-widest mt-4 uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FactsCounter;