import { FaStar } from "react-icons/fa";
import PublicLayout from "../../../layouts/PublicLayout";
import ServiceLayout from "../../../layouts/ServiceLayout";

const ServiceRatingPage = () => {
  return (
    <PublicLayout>
      <ServiceLayout />
      <section className="bg-[#f3f6f8] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white px-6 py-4 mb-4 border">
            <h2 className="text-xl font-semibold">
              Rating & Review
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6">

            <div className="col-span-12 md:col-span-4 bg-white p-6 border">
              <h3 className="font-semibold mb-4">
                What makes a good review
              </h3>

              <div className="border-t pt-4 mb-4">
                <p className="font-medium mb-1">
                  Have you used this Service?
                </p>
                <p className="text-sm text-gray-600">
                  Share your experience so others can make better decisions.
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium mb-1">
                  Why review a Service?
                </p>
                <p className="text-sm text-gray-600">
                  Your feedback helps improve service quality and trust.
                </p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-8 bg-white p-6 border">

              <h3 className="font-semibold mb-3">
                Rate this Service
              </h3>

              <div className="flex gap-2 mb-6 text-2xl">
                {[1,2,3,4,5].map((i) => (
                  <FaStar
                    key={i}
                    className="cursor-pointer text-green-500"
                  />
                ))}
              </div>
              <h3 className="font-semibold mb-2">
                Review this Service
              </h3>

              <textarea
                className="w-full border p-3 mb-4 text-sm"
                rows="5"
                placeholder="Tell us about your experience"
              />

              <input
                type="text"
                className="w-full border p-3 text-sm mb-6"
                placeholder="Title"
              />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 border flex items-center justify-center text-2xl cursor-pointer">
                  +
                </div>
              </div>
              <div className="text-right">
                <button className="bg-[#023a20] text-white px-6 py-2 rounded">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServiceRatingPage;
