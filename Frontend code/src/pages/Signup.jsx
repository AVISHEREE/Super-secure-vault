import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await axios.post(
        "https://super-secure-vault.onrender.com/user/signup",
        { username, pin }
      );

      if (res.data.success === "true") {
        setSuccessMsg("Account created successfully! Please login.");
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-neutral-400/10 border border-white/30 rounded-2xl p-10 w-full max-w-md shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-200">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-200">
              PIN (up to 8 digits)
            </label>
            <input
              type="number"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="****"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 ${
              loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } transition text-white font-semibold py-3 rounded-xl shadow-lg`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {successMsg && (
            <p className="text-green-400 text-center text-sm mt-4">
              {successMsg}
            </p>
          )}

          <a href="../login" className="hover:underline font-medium">
            <p className="text-sm text-center text-neutral-300 mt-4">
              Already have an account?
              <span className="text-indigo-400"> Log in </span>
            </p>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Signup;
