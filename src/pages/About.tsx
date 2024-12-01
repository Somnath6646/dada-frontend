import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 text-transparent bg-clip-text mb-6">
              About Dada
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A community-driven platform for sharing and discovering valuable
              resources in technology and development.
            </p>
          </div>

          {/* Hackathon Section */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
            <div className="flex items-center justify-between flex-wrap gap-6 mb-6">
              <h2 className="text-2xl font-display font-semibold text-primary-400">
                Hashnode x Modus Hackathon Project
              </h2>
              <div className="flex items-center gap-4">
                <a
                  href="https://hashnode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <img
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1611902473383/CDyAuTy75.png?auto=compress"
                    alt="Hashnode"
                    className="h-8"
                  />
                </a>
                <span className="text-gray-500">×</span>
                <a
                  href="https://modus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <img
                    src="https://mintlify.s3-us-west-1.amazonaws.com/hypermode/images/logo/dark.svg"
                    alt="Modus"
                    className="h-8"
                  />
                </a>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Dada is a project developed during the Hashnode x Modus Hackathon.
              It aims to create a collaborative space where developers can share
              and discover high-quality resources. We believe in the power of
              community-driven learning and the importance of making educational
              resources accessible to everyone.
            </p>
          </section>

          {/* Developer Section */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
            <h2 className="text-2xl font-display font-semibold mb-8 text-primary-400">
              Developer
            </h2>
            <div className="flex items-center gap-8">
              <img
                src="https://github.com/Somnath6646.png"
                alt="Somnath"
                className="w-24 h-24 rounded-full border-2 border-primary-500/30"
              />
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">
                  Somnath Mishra
                </h3>
                <p className="text-gray-400 mb-4">Full Stack Developer</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Somnath6646"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                      />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://x.com/somnath6646"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800/50">
              <div className="bg-primary-500/20 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Curated Resources
              </h3>
              <p className="text-gray-400">
                Access a carefully curated collection of articles, tutorials,
                videos, and tools shared by the community.
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800/50">
              <div className="bg-primary-500/20 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Smart Search
              </h3>
              <p className="text-gray-400">
                Find exactly what you need with our intelligent search system
                that understands context and relevance.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
            <h2 className="text-2xl font-display font-semibold mb-4 text-primary-400">
              Get in Touch
            </h2>
            <p className="text-gray-300 mb-6">
              Have questions or suggestions? Feel free to reach out through any
              of these channels:
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://x.com/somnath6646"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg text-gray-300 hover:text-primary-400 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                Follow on Twitter
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
