import { useEffect, useState } from "react";
import { KeyRound, Image, FileText, File, FileArchive } from "lucide-react";

const rotatingWords = [
  { label: "pass", icon: <KeyRound size={26} className="text-purple-400" /> },
  { label: "Img", icon: <Image size={26} className="text-pink-400" /> },
  { label: "PDF", icon: <FileText size={26} className="text-blue-400" /> },
  { label: "Doc", icon: <FileArchive size={26} className="text-green-400" /> },
  { label: "File", icon: <File size={26} className="text-yellow-400" /> },
];

const AnimatedVaultHeading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const { label, icon } = rotatingWords[index];

  return (
    <div className="text-center mb-16 px-4">
      <div className="flex justify-center items-center gap-4 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
        <span className="text-white">Save your</span>
        <span
          key={label}
          className="fade-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
        >
          {label}
        </span>
      </div>

      <div className="mt-6 flex justify-center items-center gap-3 animate-fade-slide">
        {icon}
        <p className="text-base sm:text-lg text-neutral-400 font-medium">
          Secure your {label.toLowerCase()}s in your encrypted vault.
        </p>
      </div>
    </div>
  );
};

export default AnimatedVaultHeading;
