import { PlusCircle } from "lucide-react";

const AddEntryButton = ({ onClick }) => {
  return (
    <div className="flex justify-center max-w-4xl mx-auto mb-10 px-4">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold text-lg tracking-wide shadow-lg hover:scale-105 transition-transform duration-300"
      >
        <PlusCircle className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
        <span className="font-extrabold font-[Poppins]">Add Entry</span>
        <div className="absolute inset-0 rounded-full opacity-20 bg-white blur-lg animate-pulse"></div>
      </button>
    </div>
  );
};

export default AddEntryButton;
