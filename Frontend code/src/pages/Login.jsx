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
      const response = await axios.post(
        "https://super-secure-vault.onrender.com/user/signin",
        { username, pin }
      );
      if (!response.data.success) {
        return alert("Failed to login");
      }
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-neutral-400/10 border border-white/30 rounded-2xl p-10 w-full max-w-md shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-200">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-200">
              PIN
            </label>
            <input
              type="password"
              maxLength={8}
              placeholder="****"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Log In
          </button>
          <button className="w-full flex justify-center font-bold" onClick={()=>{
            alert('Logging with demo account')
            setPin('6464');
            setUsername('av@1');
            handleLogin();
          }}>
          <p className=" text-sm text-center text-neutral-300 mt-4">
              Login with demo account
              <span className="text-indigo-400"> av@1 </span>
            </p>
            </button>
          <a
            href="../signup"
            className=" hover:underline font-medium"
          >
            <p className="text-sm text-center text-neutral-300 mt-4">
              Don’t have an account? 
              <span className="text-indigo-400"> Sign up </span>
            </p>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
