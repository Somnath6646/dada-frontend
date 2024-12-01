import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import About from "./pages/About";
import Resources from "./pages/Resources";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
        <nav className="border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link
                  to="/"
                  className="font-display text-3xl font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-transparent bg-clip-text"
                >
                  Dada
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Resources
                  </Link>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </div>
              </div>

              {/* GitHub Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Somnath6646/dada-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all group"
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover:-rotate-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Frontend</span>
                </a>
                <a
                  href="https://github.com/Somnath6646/dada-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all group"
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover:-rotate-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Backend</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Resources />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
