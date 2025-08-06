const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bbd7fb] to-[#c8e2fb] flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-[inset_0_0_0.5px_rgba(255,255,255,0.2)] rounded-[2rem] p-10 w-full max-w-md text-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Your Account
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="john_doe"
              className="w-full px-4 py-2 bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>


          <div>
            <label className="block text-sm font-medium mb-1">
              PIN (upto 8-digit)
            </label>
            <input
              type="password"
              maxLength={8}
              placeholder="****"
              className="w-full px-4 py-2 bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gray-900 hover:bg-gray-800 transition text-white font-medium py-2 rounded-xl shadow-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
