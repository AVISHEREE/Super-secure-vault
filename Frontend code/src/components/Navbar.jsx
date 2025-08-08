import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "Dashboard", path: "/" },
    { label: "About me", path: "/about" },
    { label: "Documentation", path: "/document" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-white/20 rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl sm:text-4xl font-extrabold tracking-wide font-[Poppins] flex items-center gap-1"
        >
          <span className="text-white">My</span>
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
            Vault
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 text-lg font-semibold">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`transition-colors duration-300 ${
                  isActive(link.path)
                    ? "text-rose-400"
                    : "text-neutral-300 hover:text-rose-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="bg-red-500 text-white px-6 py-2 text-sm rounded-2xl hover:bg-red-600 transition font-bold shadow-md"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white ml-3"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6">
          <ul className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block ${
                    isActive(link.path)
                      ? "text-rose-400 font-semibold"
                      : "text-neutral-300 hover:text-rose-300"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                className="w-full bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 font-bold"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
