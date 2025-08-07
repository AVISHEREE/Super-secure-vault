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
    <nav className="w-full fixed top-0 left-0 z-50 bg-neutral-400/10 backdrop-blur-md border-b border-white/40 rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide font-[Poppins] flex items-center gap-1"
        >
          <span className="text-white">My</span>
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
            Vault
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`transition-colors cursor-pointer ${
                  isActive(link.path)
                    ? "text-rose-400 font-semibold"
                    : "text-neutral-300 hover:text-rose-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button className="bg-red-500 cursor-pointer text-white px-4 py-1.5 rounded-xl hover:bg-red-600 transition"
            onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
            }}>
              
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
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block w-full ${
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
                className="w-full cursor-pointer bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
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
