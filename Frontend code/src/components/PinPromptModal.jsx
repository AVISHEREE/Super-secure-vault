import React, { useEffect, useRef, useState } from "react";

const PinPromptModal = ({ pin, setPin, onSubmit, onClose }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Autofocus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Submit on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(); // Await your submission logic (e.g. fetch or decrypt)
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 sm:px-6">
      <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 p-8 sm:p-10 rounded-3xl w-full max-w-md sm:max-w-lg shadow-2xl animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white text-3xl hover:text-red-400 transition duration-200"
        >
          &times;
        </button>

        {/* Heading */}
        <h4 className="mb-6 text-2xl sm:text-3xl font-extrabold text-center text-white">
          🔒 Enter your PIN
        </h4>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-5 py-3 mb-6 rounded-xl bg-white/80 text-black placeholder-gray-600 text-lg sm:text-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Your PIN"
          disabled={loading}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white text-lg sm:text-xl font-semibold transition duration-200 ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
          }`}
        >
          {loading ? "Fetching data..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default PinPromptModal;
