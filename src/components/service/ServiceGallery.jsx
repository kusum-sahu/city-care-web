const ServiceGallery = ({ images = [] }) => {
  return (
    <div className="bg-white rounded-xl p-5 mb-8 shadow-sm">

      <div className="grid grid-cols-12 gap-6">

        {/* PHOTOS */}
        <div className="col-span-12 lg:col-span-7">
          <h3 className="text-lg font-semibold mb-4">Photo</h3>

          <div className="grid grid-cols-3 gap-4">
            {images.slice(0, 5).map((img, i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-28 object-cover"
                />
              </div>
            ))}

            {/* VIEW ALL */}
            <div className="flex items-center justify-center bg-[#023a20] text-white rounded-lg cursor-pointer">
              View All
            </div>
          </div>
        </div>

        {/* VIDEO */}
        <div className="col-span-12 lg:col-span-5">
          <h3 className="text-lg font-semibold mb-4">Video</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="/images/video-thumb.jpg"
                alt=""
                className="w-full h-32 object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-sm bg-black/40">
                ▶
              </span>
            </div>

            <div className="relative rounded-lg overflow-hidden">
              <img
                src="/images/video-thumb.jpg"
                alt=""
                className="w-full h-32 object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-sm bg-black/40">
                ▶
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceGallery;
