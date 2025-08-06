import { ClipboardCopy, X, Expand } from "lucide-react";
import { useState } from "react";

const DecryptedModal = ({ title, password, type, onCopy, onClose }) => {
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center px-4">
        <div className="relative w-full max-w-xl bg-gradient-to-br from-white/20 to-black/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white animate-fade-in">
          
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-red-400 transition"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-center mb-6 tracking-tight text-white drop-shadow">
            🔐 Decrypted Vault Entry
          </h2>

          {/* Content */}
          <div className="space-y-6 bg-white/10 border border-white/10 p-6 rounded-2xl shadow-inner">
            <Info label="Title" value={title} />
            <Info label="Type" value={type} />

            {/* Dynamic Content */}
            {type === "image" ? (
              <ImagePreview src={password} onExpand={() => setShowFullImage(true)} />
            ) : type === "other" ? (
              <PdfPreview base64={password} />
            ) : (
              <Info label="Password" value={password} isPassword />
            )}
          </div>

          {/* Copy Action */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold shadow-lg transition-all"
            >
              <ClipboardCopy size={18} /> Copy {title}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Image */}
      {showFullImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center">
          <button
            onClick={() => setShowFullImage(false)}
            className="absolute top-6 right-6 text-white hover:text-red-400 transition"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={password}
            alt="Full View"
            className="max-w-[90vw] max-h-[80vh] rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
      )}
    </>
  );
};

// Text Field Display
const Info = ({ label, value, isPassword = false }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-medium text-white/60 uppercase tracking-wide">{label}</span>
    <p className={`text-white ${isPassword ? "font-mono text-base bg-white/10 p-2 rounded-md" : "text-sm font-light"}`}>
      {value}
    </p>
  </div>
);

// Image Preview
const ImagePreview = ({ src, onExpand }) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs font-medium text-white/60 uppercase tracking-wide">Image</span>
    <img
      src={src}
      alt="Decrypted"
      className="rounded-xl shadow-md max-h-36 object-contain border border-white/20 bg-white/10 p-1"
    />
    <button
      onClick={onExpand}
      className="text-sm text-blue-300 hover:text-blue-400 mt-1 flex items-center gap-1"
    >
      <Expand size={16} /> View Fullscreen
    </button>
  </div>
);

// PDF Preview
const PdfPreview = ({ base64 }) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs font-medium text-white/60 uppercase tracking-wide">PDF Preview</span>
    <div className="border border-white/20 bg-white/10 rounded-xl overflow-hidden shadow-md h-36">
      <iframe
        src={base64}
        title="Decrypted PDF"
        className="w-full h-full"
        frameBorder="0"
      />
    </div>
    <a
      href={base64}
      download="vault-file.pdf"
      className="text-sm text-blue-300 hover:text-blue-400 underline mt-1"
    >
      Download PDF
    </a>
  </div>
);

export default DecryptedModal;
