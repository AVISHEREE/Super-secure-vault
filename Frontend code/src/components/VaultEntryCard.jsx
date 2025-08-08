import { Eye, EyeOff, Trash2, Star } from "lucide-react";
import { useState } from "react";

const VaultEntryCard = ({
  entry,
  onDelete,
  onTriggerPinPrompt,
  getServiceLogo,
  onTogglePriority,
}) => {
  const [eyeOpen, setEyeOpen] = useState(false);

  const handleEyeClick = () => {
    setEyeOpen(true);
    setTimeout(() => {
      onTriggerPinPrompt(entry._id);
      setEyeOpen(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-neutral-700/30 backdrop-blur-md border border-white/30 px-5 py-4 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl group">
      {/* Left: Logo and Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 shadow-inner flex items-center justify-center">
          <img
            src={getServiceLogo(entry.title, entry.type)}
            alt={`${entry.title} logo`}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-100 group-hover:text-gray-200 transition">
            {entry.title}
          </h3>
          <p className="text-sm text-gray-400 font-medium capitalize">
            Type: {entry.type}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* View Button */}
        <button
          onClick={handleEyeClick}
          className="p-2 rounded-full hover:bg-white/20 transition duration-300 text-gray-300"
        >
          {eyeOpen ? (
            <Eye className="w-5 h-5 animate-pulse" />
          ) : (
            <EyeOff className="w-5 h-5" />
          )}
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(entry._id)}
          className="p-2 rounded-full hover:bg-white/20 transition duration-300 text-red-500 hover:text-red-600"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        {/* Star Priority Toggle */}
        <button
          onClick={() => onTogglePriority(entry._id)}
          className={`p-2 rounded-full transition duration-300 ${
            entry.starred
              ? "text-yellow-400 hover:text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
              : "text-white/30 hover:text-yellow-400"
          }`}
        >
          <Star
            className={`w-5 h-5 ${
              entry.starred ? "fill-yellow-400" : "fill-transparent"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default VaultEntryCard;
