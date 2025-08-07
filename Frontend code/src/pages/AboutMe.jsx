import Navbar from "../components/Navbar";
import { Github, Linkedin, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-50">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-24">
        <div className="bg-neutral-900/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/30">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-neutral-50 mb-6 tracking-tight">
            About Me
          </h1>

          {/* Bio */}
          <section className="mb-8 text-center">
            <p className="text-lg text-white leading-relaxed">
              I'm{" "}
              <span className="font-semibold text-gray-100">Akash Vyas</span>, a
              full-stack developer
            </p>
          </section>

          <div className="border-t border-white/30 my-6"></div>

          {/* Skills / Journey */}
          {/* Skills / Journey */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">🚀 What I've Done</h2>
            <ul className="list-disc list-inside text-base text-white space-y-2">
              <li>
                <a href="/" className="underline text-neutral-50">
                  <b>MyVault</b>
                </a>
                <br />a password manager with custom encryption logic and a
                clean UI.
              </li>
              <li>
                <a
                  href="https://expenses-app-lilac.vercel.app/signup"
                  className="underline"
                >
                  <b>Expense assist app</b>
                </a>
                <br /> a simple and powerful tool to help you manage your
                salary, expenses, and investments, all in one place
              </li>
              <li>
                Worked on APIs, user authentication, file uploads, and secured
                data handling.
              </li>
              <li>
                I enjoy frontend design – I like keeping things smooth, clean,
                and responsive.
              </li>
              <li>
                Experimented with projects like portfolio builders, chat apps,
                and utility tools.
              </li>
              <li>
                Always learning – I pick up new tools as I go, and I’m not
                afraid to get my hands dirty with bugs.
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">🧠 Tech Stack</h3>
              <div className="flex flex-wrap gap-3 text-sm text-gray-800">
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  JavaScript
                </span>
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  React.js
                </span>
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  Node.js
                </span>
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  Express
                </span>
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  MongoDB
                </span>
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  Tailwind CSS
                </span>
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  HTML & CSS
                </span>
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  MySql
                </span>
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  Postman
                </span>
                <span className="bg-white backdrop-blur px-3 py-1 rounded-full border border-white/40">
                  Git & GitHub
                </span>
              </div>
            </div>
          </section>

          <div className="border-t border-white/30 my-6"></div>

          {/* Contact Links */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              📬 Get in Touch
            </h2>
            <div className="flex justify-center gap-6 text-white">
              <a
                href="https://github.com/AVISHEREE/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition duration-300"
              >
                <Github size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/akash-vyas-880914290/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0072b1] transition duration-300"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="mailto:vyassakash3@gmail.com"
                className="hover:text-red-600 transition duration-300"
              >
                <Mail size={28} />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
