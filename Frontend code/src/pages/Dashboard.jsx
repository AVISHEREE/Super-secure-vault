import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import AddEntryButton from "../components/AddEntryButton";
import AddEntryModal from "../components/AddEntryModal";
import VaultEntryCard from "../components/VaultEntryCard";
import PinPromptModal from "../components/PinPromptModal";
import DecryptedModal from "../components/DecryptedModal";
import AnimatedVaultHeading from "../components/AnimatedVaultHeading";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [vault, setVault] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [pin, setPin] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const [decryptedTitle, setDecryptedTitle] = useState("");
  const [decryptedType, setDecryptedType] = useState("");
  const [showDecryptedModal, setShowDecryptedModal] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    fetchVault();

    const isTokenExpired = (token) => {
      if (!token) return true;
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
      } catch (error) {
        console.error("Error decoding token:", error);
        return true;
      }
    };

    const token = JSON.stringify(localStorage.getItem("token")).replace(
      /"/g,
      ""
    );
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }, []);

  const fetchVault = async () => {
    setIsLoading(true);
    const token = JSON.stringify(localStorage.getItem("token")).replace(
      /"/g,
      ""
    );
    try {
      const response = await axios.post(
        "https://super-secure-vault.onrender.com/vault/get-entrys",
        { pin: "6464" },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data.success) throw new Error("Failed to fetch entries");

      // Inject local priority (default: false)
      const updated = response.data.data.map((entry) => ({
        ...entry,
        priority: false,
      }));
      setVault(updated);
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to fetch vault entries");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (entryId) => {
    setSelectedEntry(entryId);
    setShowPinPrompt(true);
  };

  const handleDelete = (entryId) => {
    setSelectedEntry(entryId);
    setIsDeleteMode(true);
    setShowPinPrompt(true);
  };

  const handleUpdate = (entryId) => {
    // future use
  };

  const handleClose = () => {
    setShowPinPrompt(false);
    setShowDecryptedModal(false);
    setPin("");
    setDecryptedData("");
    setDecryptedTitle("");
    setSelectedEntry(null);
    setIsDeleteMode(false);
  };

  const confirmPin = async () => {
    const token = JSON.stringify(localStorage.getItem("token")).replace(
      /"/g,
      ""
    );

    if (isDeleteMode) {
      try {
        const response = await axios.delete(
          "https://super-secure-vault.onrender.com/vault/delete-entry",
          {
            data: {
              pin: pin,
              vaultId: selectedEntry,
            },
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          alert("Entry deleted successfully");
          setVault(vault.filter((entry) => entry._id !== selectedEntry));
        } else {
          alert("Incorrect PIN or failed to delete.");
        }
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete entry.");
      } finally {
        handleClose();
      }
    } else {
      try {
        const response = await axios.post(
          "https://super-secure-vault.onrender.com/vault/get-entry",
          {
            pin: pin,
            vaultId: selectedEntry,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setDecryptedTitle(response.data.title);
        setDecryptedType(response.data.type);
        setDecryptedData(response.data.data);
        setShowDecryptedModal(true);
        setShowPinPrompt(false);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to decrypt data.");
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decryptedData);
  };

  const onTogglePriority = async (entryId) => {
    try {
      const token = localStorage.getItem("token");

      // Find the entry and toggle its `starred` value
      const updatedVault = vault.map((entry) => {
        if (entry._id === entryId) {
          // Optimistically toggle value
          return { ...entry, starred: !entry.starred };
        }
        return entry;
      });

      // Update UI immediately
      setVault(updatedVault);

      // Send request to backend
      const entry = vault.find((e) => e._id === entryId);
      const response = await axios.post(
        "https://super-secure-vault.onrender.com/vault/star-entry",
        { entryId: entryId, starred: !entry.starred },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Toggled priority:", response.data);
    } catch (err) {
      console.error("Failed to toggle entry:", err);
      alert(
        err.response?.data?.message ||
          "Something went wrong while toggling entry."
      );
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortedVault = [...vault]
    .filter((entry) => {
      if (sortBy === "priority" || sortBy === "date") return true;
      return entry.type === sortBy;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        return (b.starred === true) - (a.starred === true); // starred first
      } else if (sortBy === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt); // newest first
      } else {
        return 0; // for filtered types, no sorting
      }
    });

  const getServiceLogo = (title, type = "") => {
    const lower = title.toLowerCase();
    const typeLower = type.toLowerCase();

    if (typeLower === "image")
      return "./src/assets/image-photo-svgrepo-com.svg";
    if (typeLower === "note")
      return "./src/assets/writing-note-svgrepo-com.svg";

    const iconMap = [
      {
        keyword: "facebook",
        url: "https://cdn-icons-png.flaticon.com/512/145/145802.png",
      },
      {
        keyword: "gmail",
        url: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
      },
      {
        keyword: "google",
        url: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
      },
      {
        keyword: "twitter",
        url: "https://cdn-icons-png.flaticon.com/512/145/145812.png",
      },
      {
        keyword: "instagram",
        url: "./src/assets/instagram-1-svgrepo-com.svg",
      },
      {
        keyword: "linkedin",
        url: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
      },
      {
        keyword: "github",
        url: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
      },
      {
        keyword: "reddit",
        url: "https://cdn-icons-png.flaticon.com/512/2111/2111589.png",
      },
      {
        keyword: "youtube",
        url: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
      },
      {
        keyword: "netflix",
        url: "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
      },
      {
        keyword: "notion",
        url: "https://cdn-icons-png.flaticon.com/512/5968/5968885.png",
      },
    ];

    for (const service of iconMap) {
      if (lower.includes(service.keyword)) return service.url;
    }

    return "./src/assets/file-svgrepo-com.svg";
  };

  return (
    <div className="min-h-screen bg-neutral-900 pt-24 px-4 sm:px-8 md:px-12 lg:px-24 py-12 font-sans text-white">
      <Navbar />
      <AnimatedVaultHeading />

      <div className="max-w-6xl mx-auto w-full space-y-8">
        <AddEntryButton onClick={() => setShowAddModal(true)} />
        {showAddModal && (
          <AddEntryModal
            onClose={() => setShowAddModal(false)}
            onSubmit={(data) => console.log("New Entry:", data)}
          />
        )}

        {/* Sort Dropdown */}
        <div className="w-full flex justify-end items-center mt-4 mb-2 px-4">
  <div className="relative">
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="pl-1 pr-0 py-2 rounded-xl bg-neutral-800 border border-white/20 text-white text-sm backdrop-blur-md focus:outline-none shadow-md hover:border-white/40 transition-all"
    >
      <option value="priority" className="text-white">
        ⭐ Priority
      </option>
      <option value="date" className="text-white">
        📅 Date
      </option>
      <option disabled className="text-white">
        ― Filter By Type ―
      </option>
      <option value="password" className="text-white">
        🔐 Password
      </option>
      <option value="note" className="text-white">
        📝 Note
      </option>
      <option value="image" className="twhite">
        🖼️ Image
      </option>
      <option value="other" className="text-white">
        📁 Other
      </option>
    </select>
    <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-white">
      ⬇️
    </div>
  </div>
</div>


        {/* Vault Entries */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-10 space-y-4">
            <div className="animate-pulse w-full space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-neutral-700"></div>
              ))}
              <p className="text-neutral-400 text-xl text-center">
                Loading your vault...
              </p>
            </div>
          </div>
        ) : vault.length === 0 ? (
          <div className="text-center text-neutral-400 text-2xl mt-10">
            Your vault is empty. <br />
            <span className="text-indigo-400 font-semibold">
              Click "Add Entry" to begin.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedVault.map((entry) => (
              <VaultEntryCard
                key={entry._id}
                entry={entry}
                onTriggerPinPrompt={handleView}
                onDelete={handleDelete}
                getServiceLogo={getServiceLogo}
                onTogglePriority={onTogglePriority}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        {showPinPrompt && (
          <PinPromptModal
            pin={pin}
            setPin={setPin}
            onSubmit={confirmPin}
            onClose={handleClose}
          />
        )}
        {showDecryptedModal && (
          <DecryptedModal
            title={decryptedTitle}
            type={decryptedType}
            password={decryptedData}
            onCopy={copyToClipboard}
            onClose={handleClose}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
