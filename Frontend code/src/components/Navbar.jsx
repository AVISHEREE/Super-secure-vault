import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full rounded-b-4xl  fixed top-0 left-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with color-changing Vault */}
        <div className="text-2xl font-extrabold tracking-wide font-[Poppins]">
          <span className="text-black">My</span>
          <span className="ml-1 text-transparent bg-clip-text animated-gradient">Vault</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 text-[15px] font-medium">
          <li className="hover:text-indigo-600 transition-colors cursor-pointer">Dashboard</li>
          <li className="hover:text-indigo-600 transition-colors cursor-pointer">Add Entry</li>
          <li className="hover:text-red-500 transition-colors cursor-pointer">Logout</li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-900 ml-3"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4 text-gray-700 text-[15px] font-medium">
            <li className="hover:text-indigo-600 transition-colors cursor-pointer">Dashboard</li>
            <li className="hover:text-indigo-600 transition-colors cursor-pointer">Add Entry</li>
            <li className="hover:text-red-500 transition-colors cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
