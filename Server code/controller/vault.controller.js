import crypto from "crypto";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const encryptData = (data, userPin) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const key = crypto.scryptSync(userPin, salt, 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    encryptedData: encrypted,
    salt,
    iv: iv.toString("hex"),
  };
};

const decryptData = (encryptedData, salt, iv, userPin) => {
  const key = crypto.scryptSync(userPin, salt, 32);
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.from(iv, "hex")
  );

  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

const toggleStarredStatus = async (req, res) => {
  const { starred , entryId } = req.body;
  const userId  = req.user.id; 

  try {
    const user = await User.findById(userId);
    const entry = user.vault.id(entryId);

    if (!entry) return res.status(404).json({ message: "Entry not found" });

    entry.starred = starred;
    await user.save();

    res.json({ success:'true' , message: "Star status updated", starred });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const addVaultEntry = async (req, res) => {
  try {
    const { title, type, data, pin } = req.body;
    if (!title || !data) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const checkPin = await bcrypt.compare(pin, user.pin);
    
    if(!checkPin){
      return res.status(404).json({ message: "Incorrect pin" });
    }
    const { encryptedData, salt, iv } = encryptData(data, pin);

    const newEntry = {
      title,
      type: type ? type : undefined,
      encryptedData,
      salt,
      iv,
    };
    user.vault.push(newEntry);
    await user.save();
    res.status(201).json({success:"true" , message: "Vault entry added" });
  } catch (err) {
    console.error("Vault Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllEntry = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.vault || user.vault.length === 0) {
      return res.status(404).json({ message: "Vault is empty" });
    }
    const vaultArray = user.vault
      .map((entry) => {
        try {
          return {
            _id: entry._id,
            title: entry.title,
            type: entry.type,
            createdAt: entry.createdAt,
            starred: entry.starred,
          };
        } catch (error) {
          return null; // Skip entries with invalid decryption
        }
      })
      .filter((entry) => entry !== null); // Remove failed decryptions

    if (vaultArray.length === 0) {
      return res
        .status(501)
        .json({ message: "Failed to decrypt any vault entries" });
    }

    res.status(200).json({success:"true" , data: vaultArray });
  } catch (err) {
    console.error("getAllEntry error:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getSingleEntry = async (req, res) => {
  try {
    const { pin, vaultId } = req.body;
    const userId = req.user.id;

    if (!pin || !vaultId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.vault || user.vault.length === 0) {
      return res.status(404).json({ message: "Vault is empty" });
    }

    const vaultObject = user.vault.id(vaultId);
    if (!vaultObject) {
      return res.status(404).json({ message: "Vault entry not found" });
    }

    let decryptedData;
    try {
      decryptedData = decryptData(
        vaultObject.encryptedData,
        vaultObject.salt,
        vaultObject.iv,
        pin
      );
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Invalid PIN or decryption failed" });
    }

    return res.status(200).json({
      _id: vaultObject._id,
      title: vaultObject.title,
      type: vaultObject.type,
      data: decryptedData,
      createdAt: vaultObject.createdAt,
    });
  } catch (err) {
    console.error("getSingleEntry error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const updateVaultEntry = async (req, res) => {
  try {
    const { entryId, field, data, pin } = req.body;
    const userId = req.user.id;

    if (!entryId || !field || !data || !pin) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log(userId);
    const user = await User.findById(`${userId}`);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.vault || !Array.isArray(user.vault)) {
      return res.status(500).json({ message: "Vault structure is invalid" });
    }

    const vaultEntry = user.vault.id(entryId);
    if (!vaultEntry) {
      return res.status(404).json({ message: "Vault enrey not found" });
    }

    const { encryptedData, salt, iv } = encryptData(data, pin);
    if (field === "title") {
      vaultEntry.title = data;
    } else if (field === "type") {
      vaultEntry.type = data;
    } else if (field === "data") {
      vaultEntry.encryptedData = encryptedData;
      vaultEntry.salt = salt;
      vaultEntry.iv = iv;
    } else {
      return res.status(400).json({ message: "Invalid field to update" });
    }

    await user.save();
    return res
      .status(200)
      .json({success:"true" , message: "Vault entry updated successfully" });
  } catch (err) {
    console.error("Error updating vault entry:", err);
    return res
      .status(500)
      .json({ message: "Internal server error while updating the Vault" });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { pin, vaultId } = req.body;
    const userId = req.user.id;

    if (!pin || !vaultId) {
      return res.status(400).json({ message: "PIN and vault ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const vaultEntry = user.vault.id(vaultId);
    if (!vaultEntry) {
      return res.status(404).json({ message: "Vault entry not found" });
    }

    
    try {
      decryptData(vaultEntry.encryptedData, vaultEntry.salt, vaultEntry.iv, pin);
    } catch (err) {
      return res.status(403).json({ message: "Invalid PIN or decryption failed" });
    }

    user.vault.pull({ _id: vaultId });
    await user.save();

    return res.status(200).json({success:"true" , message: "Vault entry deleted successfully" });
  } catch (err) {
    console.error("Delete Entry Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export {
  addVaultEntry,
  updateVaultEntry,
  getAllEntry,
  getSingleEntry,
  deleteEntry,
  toggleStarredStatus
};
