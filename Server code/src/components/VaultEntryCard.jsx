import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";

const VaultEntryCard = ({ entry, onDelete, onTriggerPinPrompt, getServiceLogo }) => {
  const [eyeOpen, setEyeOpen] = useState(false);

  const handleEyeClick = () => {
    setEyeOpen(true);
    setTimeout(() => {
      onTriggerPinPrompt(entry._id);
      setEyeOpen(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-between gap-6 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl group">
      
      {/* Left: Logo + Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md">
          <img
            src={getServiceLogo(entry.title, entry.type)}
            alt={`${entry.title} logo`}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
            {entry.title}
          </h3>
          <p className="text-sm text-gray-600 font-medium capitalize tracking-wide">
            Type: {entry.type}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleEyeClick}
          className="text-blue-600 hover:text-blue-800 transition-all duration-300"
        >
          {eyeOpen ? (
            <Eye className="w-6 h-6 animate-pulse" />
          ) : (
            <EyeOff className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={() => onDelete(entry._id)}
          className="text-red-500 hover:text-red-700 transition-all duration-300"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default VaultEntryCard;
