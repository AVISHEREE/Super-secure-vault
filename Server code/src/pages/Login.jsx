import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/signin", {
        username,
        pin,
      });
      console.log(response);
      if (!response.data.success) {
        return alert("failed to login");
      }

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bbd7fb] to-[#c8e2fb] flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.2)] rounded-[2rem] p-10 w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">PIN</label>
            <input
              type="password"
              maxLength={8}
              placeholder="****"
              className="w-full px-4 py-2 bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gray-900 hover:bg-gray-800 transition text-white font-medium py-2 rounded-xl shadow-lg"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
