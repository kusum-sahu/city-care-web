import { FaTimes } from "react-icons/fa";

const EnquiryModal = ({ open, onClose, serviceName }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal Box */}
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg relative p-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/public/images/citycare.png"
            alt="CityCare"
            className="h-10"
          />
          <div>
            <h2 className="text-lg font-semibold">Send Inquiry</h2>
            <p className="text-sm text-gray-500">
              Typically replies within an hour
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="text-sm text-gray-600">Inquiry For</label>
            <input
              type="text"
              value={serviceName}
              disabled
              className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="text"
              placeholder="Enter Number"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">E-mail Id</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Enter Address</label>
            <textarea
              placeholder="Enter Address"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Message</label>
            <textarea
              placeholder="Message"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-green-800 text-white px-8 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
