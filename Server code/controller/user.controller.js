const bcrypt = require("bcrypt");
const User = require("../models/user");

const updateUser = async (req, res) => {
  const { field, data, currentPin } = req.body;
  const userId = req.user.id;

  if (!field || !data || !userId) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (field === "username") {
      user.username = data;
      await user.save();
      return res.status(200).json({ message: "Username updated" });

    } else if (field === "pin") {
      // Validate currentPin before updating
      if (!currentPin) {
        return res.status(400).json({ message: "Current PIN required to change PIN" });
      }

      const isPinCorrect = await bcrypt.compare(currentPin, user.pin);
      if (!isPinCorrect) {
        return res.status(403).json({ message: "Incorrect current PIN" });
      }

      const hashedPin = await bcrypt.hash(data, 10);
      user.pin = hashedPin;
      await user.save();
      return res.status(200).json({ message: "PIN updated" });

    } else {
      return res.status(400).json({success:"true" , message: "Invalid field" });
    }
  } catch (err) {
    console.error("Update User Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { pin } = req.body;
  const userId = req.user.id;

  if (!pin || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const checkPin = await bcrypt.compare(pin, user.pin);
    if (!checkPin) {
      return res.status(403).json({ message: "Incorrect PIN" });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({success:"true" , message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updateUser , deleteUser };
