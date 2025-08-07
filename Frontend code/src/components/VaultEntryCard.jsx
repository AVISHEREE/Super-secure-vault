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
    <div className="flex items-center justify-between gap-4 bg-neutral-700/20 backdrop-blur-md border border-white/30 px-5 py-3 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_40px_rgba(0,0,0,0.1)] group">
      
      {/* Left: Logo and Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl shadow-inner">
          <img
            src={getServiceLogo(entry.title, entry.type)}
            alt={`${entry.title} logo`}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-gray-50 group-hover:text-gary-200 transition-colors">
            {entry.title}
          </h3>
          <p className="text-sm text-gray-300 font-medium capitalize">
            Type: {entry.type}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleEyeClick}
          className="p-2 rounded-full hover:bg-white/30 transition-all duration-300 text-gray-300 hover:text-gray-300"
        >
          {eyeOpen ? (
            <Eye className="w-5 h-5 animate-pulse" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={() => onDelete(entry._id)}
          className="p-2 rounded-full hover:bg-white/30 transition-all duration-300 text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default VaultEntryCard;
