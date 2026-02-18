import React from 'react';
// React Icons से FontAwesome icons इम्पोर्ट कर रहे हैं
import { 
  FaChevronCircleRight, 
  FaMapMarkerAlt, 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar 
} from 'react-icons/fa';

const RecentActivity = () => {
  const reviews = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur.",
      location: "Patia-Bhubaneswar",
      user: "Rudra Narayana",
      action: "Wrote a Review",
      reviewText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi corrupti cupiditate sequi laboriosam nemo nostrum quo ipsa magnam assumenda veniam.",
      mainImg: "/public/images/Alumni.jpg",
      userImg: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur.",
      location: "Patia-Bhubaneswar",
      user: "Rudra Narayana",
      action: "Wrote a Review",
      reviewText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi corrupti cupiditate sequi laboriosam nemo nostrum quo ipsa magnam assumenda veniam.",
      mainImg: "/public/images/Alumni.jpg",
      userImg: "https://i.pravatar.cc/150?u=2",
    }
  ];

  return (
    <section className="bg-gray-50 py-[30px] px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
          <a href="#" className="flex items-center text-teal-600 font-semibold hover:text-teal-700 gap-2 text-sm md:text-base transition-colors">
            View All Activities <FaChevronCircleRight className="text-lg" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Section: Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((item) => (
              <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <div className="relative h-52">
                  <img src={item.mainImg} alt="Activity" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-md leading-tight">{item.title}</h3>
                    <p className="text-gray-200 text-xs flex items-center mt-1">
                      <FaMapMarkerAlt className="mr-1" /> {item.location}
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={item.userImg} alt={item.user} className="w-12 h-12 rounded-full border-2 border-orange-100" />
                    <div>
                      <h4 className="text-teal-600 font-bold text-sm leading-tight">{item.user}</h4>
                      <span className="text-gray-500 text-[11px] uppercase tracking-wider">{item.action}</span>
                    </div>
                  </div>

                  {/* Rating Stars - Gray (To be rated) */}
                  <div className="flex gap-1 mb-3 text-gray-300">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.reviewText}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section: Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#e9eaf9] p-5 rounded-t-xl text-center border-b border-white/20">
              <h4 className="font-bold text-gray-700 text-lg">How Would You Rate Your Experience?</h4>
            </div>
            
            <div className="bg-[#f2faff] border border-t-0 border-gray-100 rounded-b-xl p-3 flex flex-col gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-blue-50">
                  <img src="/public/images/Alumni.jpg" alt="Thumb" className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                  
                  <div className="flex-1">
                    <h6 className="font-bold text-gray-800 text-sm">Lorem, ipsum.</h6>
                    
                    {/* Orange Rating Stars */}
                    <div className="flex text-orange-500 text-xs my-1">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                    </div>
                    
                    <p className="text-[11px] text-gray-500 flex items-center mb-2">
                      <FaMapMarkerAlt className="mr-1" /> Patia-Bhubaneswar
                    </p>
                    
                    {/* Interactive Rating Stars (Gray) */}
                    <div className="flex gap-1.5 text-gray-200">
                       {[...Array(5)].map((_, i) => <FaStar key={i} className="text-lg cursor-pointer hover:text-teal-400 transition-colors" />)}
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <a href="#" className="text-[11px] font-bold text-teal-600 hover:underline uppercase tracking-tight whitespace-nowrap">
                      Tap to rate
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RecentActivity;