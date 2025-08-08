import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const handleLogin = async (e, customUsername = null, customPin = null) => {
    if (e) e.preventDefault();
    setLoading(true); // start loading

    const loginUsername = customUsername || username;
    const loginPin = customPin || pin;

    try {
      const response = await axios.post(
        "https://super-secure-vault.onrender.com/user/signin",
        { username: loginUsername, pin: loginPin }
      );

      if (!response.data.success) {
        setLoading(false);
        return alert("Failed to login");
      }

      const token = response.data.token;
      localStorage.setItem("token", token);

      // Force reload to update route-checking logic in App.jsx
      window.location.reload();
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-neutral-400/10 border border-white/30 rounded-2xl p-10 w-full max-w-md shadow-2xl text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

        <form className="space-y-5" onSubmit={(e) => handleLogin(e)}>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-200">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-200">
              PIN
            </label>
            <input
              type="number"
              maxLength={8}
              placeholder="****"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
              onChange={(e) => setPin(e.target.value)}
              value={pin}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-xl shadow-lg ${loading && 'opacity-60 cursor-not-allowed'}`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <button
            type="button"
            disabled={loading}
            className={`w-full cursor-pointer flex justify-center font-bold ${loading && 'opacity-60 cursor-not-allowed'}`}
            onClick={() => {
              alert("Logging in with demo account");
              handleLogin(null, "av@1", "6464");
            }}
          >
            <p className="text-sm text-center text-neutral-300 mt-4">
              {loading ? "Please wait..." : (
                <>
                  Login with demo account
                  <span className="text-indigo-400"> av@1 </span>
                </>
              )}
            </p>
          </button>

          <a href="../signup" className="hover:underline font-medium">
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
