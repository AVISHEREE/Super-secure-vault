import Navbar from "../components/Navbar";

const Document = () => {
  const example = {
    password: "myPass123",
    binary:
      "01101101 01111001 01010000 01100001 01110011 01110011 00110001 00110010 00110011",
    encrypted: "EncryptedBinary = Binary × PIN",
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-5 py-24">
        <article className="bg-neutral-400/10 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/30">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-white mb-8 tracking-tight">
            🔐 MyVault Documentation
          </h1>

          {/* Overview */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">📘 Overview</h2>
            <p className="text-base leading-relaxed text-neutral-200">
              MyVault is a minimal, secure password manager designed to keep
              your credentials and documents safe with a beautiful and intuitive
              interface.
            </p>
          </section>

          <div className="border-t border-white/30 my-6" />

          {/* Features */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-2">✨ Features</h2>
            <ul className="list-disc list-inside text-base text-neutral-200 space-y-2">
              <li>Add, view, update, and delete vault entries</li>
              <li>PIN-based encryption/decryption for sensitive data</li>
              <li>Upload PDF, TXT, or DOCX files to your vault</li>
              <li>Click-to-copy passwords securely</li>
              <li>Responsive and clean glassmorphic design</li>
            </ul>
          </section>

          <div className="border-t border-white/30 my-6" />

          {/* How It Works */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">⚙️ How It Works</h2>

            <p className="text-base leading-relaxed text-neutral-200 mb-4">
              MyVault encrypts passwords in a two-step logic:
            </p>

            {/* Step 1 - Binary */}
            <div className="bg-white/10 p-4 rounded-md border border-white/20 mb-4">
              <p className="text-sm text-neutral-300 mb-1 font-semibold">
                🔢 Original Password:
              </p>
              <code className="block text-white font-mono bg-neutral-800 rounded p-2 mb-2">
                {example.password}
              </code>

              <p className="text-sm text-neutral-300 mb-1 font-semibold">
                📊 Converted to Binary:
              </p>
              <code className="block text-white font-mono bg-neutral-800 rounded p-2">
                {example.binary}
              </code>
            </div>

            {/* Step 2 - Encryption */}
            <div className="bg-white/10 p-4 rounded-md border border-white/20">
              <p className="text-sm text-neutral-300 mb-1 font-semibold">
                🔐 Encrypted with PIN:
              </p>
              <code className="block text-white font-mono bg-neutral-800 rounded p-2">
                {example.encrypted}
              </code>
              <p className="text-xs text-neutral-400 mt-2 italic">
                (Only you know your PIN — it's required to decrypt the data.)
              </p>
            </div>
          </section>

          <div className="border-t border-white/30 my-6" />

          {/* Tech Stack */}
          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">🧰 Tech Stack</h2>
            <ul className="list-disc list-inside text-base text-neutral-200 space-y-2">
              <li>
                <span className="font-medium">Frontend:</span> React.js +
                Tailwind CSS
              </li>
              <li>
                <span className="font-medium">Backend:</span> Node.js,
                Express.js
              </li>
              <li>
                <span className="font-medium">Database:</span> MongoDB
              </li>
              <li>
                <span className="font-medium">Security:</span> Custom
                binary-based PIN encryption
              </li>
            </ul>
          </section>
        </article>

        <div className="w-full flex justify-center mt-6">
          <a
            href="https://github.com/AVISHEREE/Super-secure-vault"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <span className="mr-2">Github Code Link</span>
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Document;
