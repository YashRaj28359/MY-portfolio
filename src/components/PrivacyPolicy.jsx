import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-bg min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[70vw] h-[50vh] bg-gray-500/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="max-w-4xl mx-auto relative z-10 px-6 md:px-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-none"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#0c0c0c] border border-border-subtle rounded-3xl p-8 md:p-12 lg:p-16 hover:border-gray-700 transition-colors duration-500"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border-subtle">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-white">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-[f6] text-white">Privacy Policy</h1>
              <p className="text-gray-500 text-sm mt-1 font-[f3]">Effective Date: June 12, 2026</p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-gray-300 font-[f3] text-base md:text-lg leading-relaxed">
            <section>
              <h2 className="text-xl md:text-2xl font-[f5] text-white mb-3">1. Introduction</h2>
              <p className="text-gray-400">
                Welcome to Yashrajtech. This Privacy Policy explains how Yash Raj Singh ("we", "us", or "our") collects, uses, and protects your personal information when you visit our website (yashrajtech.online) and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-[f5] text-white mb-3">2. Information We Collect</h2>
              <p className="text-gray-400 mb-3">
                We may collect personal information that you voluntarily provide to us when you fill out contact forms or communicate with us. This information may include:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-400">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-[f5] text-white mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-400 mb-3">
                We use the information we collect strictly for professional purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-400">
                <li>To respond to your inquiries and provide customer support.</li>
                <li>To send administrative information, service updates, or project details.</li>
                <li>To communicate with you via email or WhatsApp regarding our services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-[f5] text-white mb-3">4. Third-Party Services & WhatsApp API</h2>
              <p className="text-gray-400">
                We do not sell or rent your personal information to third parties. However, we may use third-party services (such as Meta platforms for WhatsApp API integration) to communicate with you effectively. These platforms have their own privacy policies regarding how they handle data transmitted through their services.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-[f5] text-white mb-3">5. Data Security</h2>
              <p className="text-gray-400">
                We take reasonable technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse.
              </p>
            </section>

            <section className="pt-6 border-t border-border-subtle">
              <h2 className="text-xl md:text-2xl font-[f5] text-white mb-3">6. Contact Us</h2>
              <p className="text-gray-400 mb-4">
                If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-sm md:text-base">
                <div>
                  <span className="text-gray-500 block text-xs uppercase tracking-wider font-[f1]">Developer</span>
                  <span className="text-white font-[f4]">Yash Raj Singh</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs uppercase tracking-wider font-[f1]">Email</span>
                  <a href="mailto:yashrajsingh28359@gmail.com" className="text-white hover:text-gray-300 font-[f4] underline decoration-gray-500 underline-offset-4">
                    yashrajsingh28359@gmail.com
                  </a>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs uppercase tracking-wider font-[f1]">Phone</span>
                  <a href="tel:+919399886418" className="text-white hover:text-gray-300 font-[f4] underline decoration-gray-500 underline-offset-4">
                    +919399886418
                  </a>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs uppercase tracking-wider font-[f1]">Address</span>
                  <span className="text-white font-[f4] block">Janjgir Champa, Chhattisgarh, Ward-9 Khokhsa, 495668</span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
