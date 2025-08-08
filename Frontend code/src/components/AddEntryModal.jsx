import axios from "axios";
import {
  Lock,
  StickyNote,
  Image,
  File,
  ChevronDown
} from "lucide-react";
import React, { useState } from "react";

const AddEntryModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState("");
  const [fileName, setFileName] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setData(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!title || !type || !data || !pin) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://super-secure-vault.onrender.com/vault/add-entry",
        { title, type, data, pin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Entry added successfully:", response.data);
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Failed to add entry:", err);
      alert(
        err.response?.data?.message ||
          "Something went wrong while adding the entry."
      );
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case "password":
        return <Lock className="w-4 h-4 mr-2" />;
      case "note":
        return <StickyNote className="w-4 h-4 mr-2" />;
      case "image":
        return <Image className="w-4 h-4 mr-2" />;
      case "other":
        return <File className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  const renderPreview = () => {
    if (!data) return null;

    if (fileName.endsWith(".pdf")) {
      return (
        <iframe
          src={data}
          title="PDF Preview"
          className="w-full h-64 border border-white/20 rounded-lg mt-2"
        ></iframe>
      );
    }

    if (fileName.endsWith(".txt")) {
      const decoded = atob(data.split(",")[1]);
      return (
        <textarea
          readOnly
          value={decoded}
          className="w-full h-40 mt-2 p-2 rounded-lg bg-white/10 text-white border border-white/20"
        ></textarea>
      );
    }

    return (
      <div className="mt-2">
        <a
          href={data}
          download={fileName}
          className="text-indigo-400 hover:underline text-sm"
        >
          📥 Click to download {fileName}
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="relative bg-neutral-400/10 backdrop-blur-xl border border-white/30 p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl hover:text-red-400"
        >
          &times;
        </button>

        <h4 className="text-2xl font-bold mb-6 text-center">
          ➕ New Vault Entry
        </h4>

        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entry Title"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="relative w-full text-black">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full pl-10 pr-10 py-3 appearance-none rounded-lg bg-white/10 text-white placeholder:text-neutral-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="" disabled className="text-black">
                🚀 Select Type
              </option>
              <option className="text-black" value="password">Password</option>
              <option className="text-black" value="note">Note</option>
              <option className="text-black" value="image">Image</option>
              <option className="text-black" value="other">Other</option>
            </select>

            <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white pointer-events-none">
              {getIcon()}
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/70 pointer-events-none">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>

          {type === "image" || type === "other" ? (
            <>
              <input
                type="file"
                accept={
                  type === "image"
                    ? "image/*"
                    : ".pdf,.txt,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                }
                onChange={handleFileChange}
                className="block w-full text-sm text-white bg-white/10 border border-white/20 rounded-lg cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
              />
              {renderPreview()}
            </>
          ) : (
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Enter Data"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          )}

          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter your PIN"
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 px-4 py-2 rounded-lg font-semibold transition duration-300 flex justify-center items-center ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Saving...
            </div>
          ) : (
            <>💾 Save Entry</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddEntryModal;
