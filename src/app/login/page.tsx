"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Sparkles, Heart, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    console.log("Login:", { email, password });
    // توجيه بسيط للوحة التحكم بعد تسجيل الدخول
    if (email && password) {
      window.location.href = "/admin";
    }
  };

  // تحديد مواضع ثابتة للقلوب بدلاً من Math.random
  const heartPositions = [
    { left: "10%", top: "20%", size: 25, delay: 0 },
    { left: "25%", top: "60%", size: 30, delay: 0.8 },
    { left: "40%", top: "30%", size: 20, delay: 1.6 },
    { left: "55%", top: "70%", size: 28, delay: 2.4 },
    { left: "70%", top: "40%", size: 22, delay: 3.2 },
    { left: "85%", top: "50%", size: 26, delay: 4 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-[#E0B0FF] to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        
        {/* Floating Hearts */}
        {heartPositions.map((pos, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, (i % 2 === 0 ? 25 : -25), 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: pos.delay
            }}
            className="absolute"
            style={{
              left: pos.left,
              top: pos.top
            }}
          >
            <Heart className="text-white/20" size={pos.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white/95 backdrop-blur-xl rounded-[40px] p-8 md:p-12 max-w-md w-full shadow-2xl relative z-10"
      >
        {/* Logo/Title Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
            className="inline-block mb-4"
          >
            <Sparkles className="text-[#E0B0FF]" size={48} />
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-black mb-2 bg-gradient-to-r from-[#E0B0FF] to-purple-600 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200%" }}
          >
            Boutique Amina
          </motion.h1>
          
          <p className="text-gray-600 font-medium">Bienvenue Admin</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-bold text-purple-900 mb-2">Email</label>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E0B0FF]"
              >
                <Mail size={20} />
              </motion.div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@boutique-amina.com"
                className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-[#E0B0FF]/30 focus:border-[#E0B0FF]/40 transition-all font-medium"
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-bold text-purple-900 mb-2">Mot de passe</label>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E0B0FF]"
              >
                <Lock size={20} />
              </motion.div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 ring-[#E0B0FF]/30 focus:border-[#E0B0FF]/40 transition-all font-medium"
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
            </div>
          </motion.div>

          {/* Remember & Forgot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between text-sm"
          >
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-2 border-[#E0B0FF]/30 text-[#E0B0FF] focus:ring-2 focus:ring-[#E0B0FF]/40"
              />
              <span className="text-gray-600 font-medium group-hover:text-[#E0B0FF] transition-colors">
                Se souvenir de moi
              </span>
            </label>
            
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              className="text-[#E0B0FF] font-bold hover:text-purple-600 transition-colors"
            >
              Mot de passe oublié ?
            </motion.button>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(224, 176, 255, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#E0B0FF] via-purple-500 to-[#E0B0FF] text-white py-4 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-[#E0B0FF] opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="relative z-10 flex items-center gap-2">
              <LogIn size={22} />
              Se connecter
            </span>
          </motion.button>
        </form>

        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#E0B0FF]/50 to-purple-400 rounded-full opacity-20 blur-2xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-[#E0B0FF]/50 rounded-full opacity-20 blur-2xl"
        />
      </motion.div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-center text-white/80 text-sm font-medium"
      >
        <motion.p
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          © 2024 Boutique Amina - Tous droits réservés
        </motion.p>
      </motion.div>
    </div>
  );
}