import React from "react";

const PinPromptModal = ({ pin, setPin, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="relative bg-black/40 backdrop-blur-lg border border-white/30 p-6 rounded-2xl w-full max-w-md shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl hover:text-red-400"
        >
          &times;
        </button>

        <h4 className="mb-4 text-xl font-bold text-center text-white">
          🔒 Enter your PIN
        </h4>

        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full px-4 py-2 mb-5 rounded-lg bg-white/70 text-black placeholder-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your PIN"
        />

        <button
          onClick={onSubmit}
          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PinPromptModal;
