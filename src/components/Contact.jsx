import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin, CheckCircle2, AlertCircle, Loader2, Phone, Shield } from 'lucide-react';
import emailjs from '@emailjs/browser';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);



const Contact = () => {
  const [time, setTime] = useState(new Date());
  
  // EmailJS form state and ref
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata' // Hardcoded to IST since user is based in India
  });

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    emailjs.sendForm(
      'service_f78tt3g', 
      'template_enuf3im', 
      formRef.current, 
      'ITKZbTsweefBcJJuZ'
    )
    .then(() => {
        setIsSubmitting(false);
        setStatus('success');
        formRef.current.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => setStatus(null), 5000);
    }, (error) => {
        console.error('Email sending failed:', error);
        setIsSubmitting(false);
        setStatus('error');
        setTimeout(() => setStatus(null), 5000);
    });
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-dark-bg relative overflow-hidden">
      {/* Ambient Background Glow (Lower Left) */}
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-gray-500/30 rounded-full blur-[140px] pointer-events-none -translate-x-1/4 translate-y-1/4 z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#0c0c0c] border border-border-subtle rounded-3xl p-8 md:p-16 lg:p-24 flex flex-col md:flex-row items-center justify-between gap-12 group hover:border-gray-700 transition-colors duration-500"
        >
          <div className="flex-1 text-center md:text-left relative z-20">
            <h2 className="text-5xl md:text-7xl font-[f6] mb-6 tracking-tighter cursor-crosshair">
              Let's build <br/> 
              <span 
                className="text-transparent transition-all duration-300 hover:text-white" 
                style={{ WebkitTextStroke: '2px #6b7280' }}
              >
                together.
              </span>
            </h2>
            <p className="text-gray-400 font-[f3] text-xl max-w-md mx-auto md:mx-0">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </div>
          
          {/* Modern Contact Form */}
          <div className="flex-1 w-full max-w-lg mt-12 md:mt-0 relative z-20">
            <form ref={formRef} className="flex flex-col gap-6" onSubmit={sendEmail}>
              <div className="flex flex-col md:flex-row gap-6">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-[f4] placeholder-gray-600 cursor-text disabled:opacity-50"
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-[f4] placeholder-gray-600 cursor-text disabled:opacity-50"
                />
              </div>
              <textarea 
                name="message"
                placeholder="Tell me about your project..." 
                rows="4"
                required
                disabled={isSubmitting}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all font-[f4] placeholder-gray-600 resize-none cursor-text disabled:opacity-50"
              ></textarea>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="relative overflow-hidden group bg-white text-black rounded-full px-8 py-5 font-[f5] text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isSubmitting ? (
                    <>Sending... <Loader2 className="w-6 h-6 animate-spin" /></>
                  ) : (
                    <>Send Message <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" /></>
                  )}
                </span>
                {!isSubmitting && <div className="absolute inset-0 bg-gray-200 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-0"></div>}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-green-400 font-[f4] mt-2">
                  <CheckCircle2 className="w-5 h-5" /> Message sent successfully!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-red-400 font-[f4] mt-2">
                  <AlertCircle className="w-5 h-5" /> Something went wrong. Try again.
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Footer Top border */}
        {/* Footer Top border */}
        <div className="mt-24 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Left: Logo & Address stacked below */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="text-xl font-[f5] tracking-tighter text-white">
              YashRajTech
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm font-[f4] text-center md:text-left">
              <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0" />
              <span>Janjgir Champa, Chhattisgarh, Ward-9 Khokhsa, 495668</span>
            </div>
          </div>
          
          {/* Right: Links & Time Widget */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4 text-sm font-[f4] text-gray-400">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=yashrajsingh28359@gmail.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2 border border-gray-800 hover:border-gray-500 px-4 py-2 rounded-full cursor-none">
                <Mail className="w-4 h-4" /> yashrajsingh28359@gmail.com
              </a>
              <a href="tel:+919399886418" className="hover:text-white transition-colors flex items-center gap-2 border border-gray-800 hover:border-gray-500 px-4 py-2 rounded-full cursor-none flex-shrink-0">
                <Phone className="w-4 h-4" /> +919399886418
              </a>
              <a href="https://github.com/YashRaj28359" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2 border border-gray-800 hover:border-gray-500 px-4 py-2 rounded-full cursor-none flex-shrink-0">
                <GithubIcon /> Github
              </a>
              <Link to="/privacy" className="hover:text-white transition-colors flex items-center gap-2 border border-gray-800 hover:border-gray-500 px-4 py-2 rounded-full cursor-none flex-shrink-0">
                <Shield className="w-4 h-4" /> Privacy Policy
              </Link>
            </div>

            <div className="flex items-center gap-3 border border-border-subtle rounded-full px-4 py-2 hover:border-gray-500 hover:text-white transition-colors text-sm text-gray-500 font-[f4]">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="tracking-widest uppercase font-[f1] text-[10px] md:text-xs">{formattedTime} IST</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom: Copyright in the middle bottom */}
        <div className="mt-8 pt-8 border-t border-border-subtle/30 flex justify-center items-center text-sm text-gray-600 font-[f4]">
          <div>
            © 2026 Yash Raj Singh. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
