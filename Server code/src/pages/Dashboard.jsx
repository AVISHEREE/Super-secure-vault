import axios from "axios";
import {jwtDecode} from "jwt-decode";
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
  useEffect(() => {
    fetchVault();
    const isTokenExpired = (token) => {
      if (!token) return true; // No token means it's effectively "expired" or invalid
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decodedToken.exp < currentTime; // Check if expiration time is in the past
      } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Treat decoding errors as expired/invalid
      }
    };
    const getToken = JSON.stringify(localStorage.getItem("token"));
    const token = getToken.replace(/"/g, "");
    if (isTokenExpired(token)) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  }, []);

  const fetchVault = async () => {
    const getToken = JSON.stringify(localStorage.getItem("token"));
    const token = getToken.replace(/"/g, "");
    try {
      const response = await axios.post(
        "http://localhost:3000/vault/get-entrys",
        { pin: "6464" },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data.success) {
        alert(err.response?.data?.message || "failed to fetch vault entries");
      }
      const entries = response.data.data;
      setVault(entries);
    } catch (err) {
      alert(err.response?.data?.message || "failed to fetch vault entries");
    }
  };

  const handleView = (entryId) => {
    setSelectedEntry(entryId);
    setShowPinPrompt(true);
  };
  const handleUpdate = (entryId) => {};
  const confirmPin = async () => {
    const token = JSON.stringify(localStorage.getItem("token")).replace(
      /"/g,
      ""
    );

    if (isDeleteMode) {
      // 🔐 Handle delete logic
      try {
        const response = await axios.delete(
          "http://localhost:3000/vault/delete-entry",
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
      // 🔓 Handle view/decrypt logic
      try {
        const response = await axios.post(
          "http://localhost:3000/vault/get-entry",
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

  const handleDelete = (entryId) => {
    setSelectedEntry(entryId);
    setIsDeleteMode(true);
    setShowPinPrompt(true);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decryptedData);
  };

  const getServiceLogo = (title, type = "") => {
    const lower = title.toLowerCase();
    const typeLower = type.toLowerCase();

    // If type is image, return gallery icon
    if (typeLower === "image") {
      return "https://cdn-icons-png.flaticon.com/512/1829/1829586.png"; // Elegant gallery icon
    }

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
        url: "https://cdn-icons-png.flaticon.com/512/145/145805.png",
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
        keyword: "youtube",
        url: "https://cdn-icons-png.flaticon.com/512/145/145807.png",
      },
      {
        keyword: "reddit",
        url: "https://cdn-icons-png.flaticon.com/512/2111/2111589.png",
      },
      {
        keyword: "whatsapp",
        url: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
      },
      {
        keyword: "snapchat",
        url: "https://cdn-icons-png.flaticon.com/512/2111/2111698.png",
      },
      {
        keyword: "amazon",
        url: "https://cdn-icons-png.flaticon.com/512/5968/5968841.png",
      },
      {
        keyword: "netflix",
        url: "https://cdn-icons-png.flaticon.com/512/5977/5977590.png",
      },
      {
        keyword: "spotify",
        url: "https://cdn-icons-png.flaticon.com/512/174/174872.png",
      },
      {
        keyword: "apple",
        url: "https://cdn-icons-png.flaticon.com/512/733/733590.png",
      },
      {
        keyword: "notion",
        url: "https://cdn-icons-png.flaticon.com/512/5968/5968885.png",
      },
      {
        keyword: "slack",
        url: "https://cdn-icons-png.flaticon.com/512/2111/2111615.png",
      },
      {
        keyword: "discord",
        url: "https://cdn-icons-png.flaticon.com/512/2111/2111370.png",
      },
      {
        keyword: "dribbble",
        url: "https://cdn-icons-png.flaticon.com/512/733/733544.png",
      },
      {
        keyword: "behance",
        url: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
      },
      {
        keyword: "telegram",
        url: "https://cdn-icons-png.flaticon.com/512/2111/2111646.png",
      },
    ];

    for (const service of iconMap) {
      if (lower.includes(service.keyword)) {
        return service.url;
      }
    }

    return "https://cdn-icons-png.flaticon.com/512/1041/1041916.png"; // default elegant lock icon
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bbd7fb] to-[#c8e2fb] pt-24 px-4 py-10 font-sans">
      <Navbar />
      <AnimatedVaultHeading />

      <div className="grid gap-6 max-w-fit mx-auto ">
        <AddEntryButton onClick={() => setShowAddModal(true)} />

        {showAddModal && (
          <AddEntryModal
            onClose={() => setShowAddModal(false)}
            onSubmit={(data) => {
              console.log("New Entry:", data);
              // You can call your backend API to store this new entry here
            }}
          />
        )}

        {vault.map((entry) => (
          <VaultEntryCard
            key={entry._id}
            entry={entry}
            onTriggerPinPrompt={handleView}
            onDelete={handleDelete}
            getServiceLogo={getServiceLogo}
          />
        ))}

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
