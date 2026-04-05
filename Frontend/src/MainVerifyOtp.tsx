import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import { FaEnvelope, FaKey, FaMoon, FaSun, FaArrowLeft, FaShieldAlt } from "react-icons/fa";

const MainVerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(true);

  const emailFromSignup = location.state?.email || "";
  const roleFromSignup = location.state?.role || ""; // ✅ ADDED

  const [email] = useState(emailFromSignup);
  const [otp, setOtp] = useState("");

  const theme = {
    canvas: isDark
      ? "bg-gradient-to-br from-[#0a0a0f] via-[#0f0f17] to-[#0a0a0f]"
      : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9]",
    container: isDark
      ? "bg-white/[0.03] border-white/10 backdrop-blur-3xl"
      : "bg-white/60 border-white/40 backdrop-blur-3xl shadow-[0_10px_50px_rgba(0,0,0,0.05)]",
    textMain: isDark ? "text-white" : "text-slate-900",
    textMuted: isDark ? "text-zinc-400" : "text-slate-500",
    input: "w-full bg-transparent border-b py-3 text-md font-light outline-none transition-all duration-500",
    inputBorder: isDark ? "border-white/10 focus:border-indigo-500/80" : "border-slate-300 focus:border-indigo-500",
    panel: isDark ? "bg-white/[0.02] backdrop-blur-xl" : "bg-white/50 backdrop-blur-xl",
    button: "bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 shadow-[0_20px_60px_rgba(99,102,241,0.4)]",
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://tailor-project-backend.vercel.app/user/verify-otp", {
        email,
        otp,
      });

      alert(response.data.msg);

      localStorage.setItem("role", roleFromSignup);

      navigate("/login");

    } catch (error: any) {
      alert(error.response?.data?.msg || "Verification failed");
    }
  };

  return (
    <div className={`min-h-screen ${theme.canvas} transition-all duration-700 flex items-center justify-center p-6 relative overflow-hidden font-sans`}>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-25 left-25 w-150 h-150 rounded-full blur-[160px] opacity-20 ${isDark ? "bg-indigo-600" : "bg-indigo-300"}`} />
        <div className={`absolute bottom-30 right-30 w-125 h-125 rounded-full blur-[140px] opacity-10 ${isDark ? "bg-violet-500" : "bg-pink-200"}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative w-full max-w-xl ${theme.container} border shadow-2xl rounded-[3rem] overflow-hidden z-10 p-10 lg:p-16`}
      >
        
        {/* Theme Switch */}
        <div className="absolute top-8 right-8 z-30">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="px-5 py-2 rounded-full border border-white/20 backdrop-blur-md hover:scale-105 transition"
          >
            {isDark ? <FaSun className="text-white text-xs" /> : <FaMoon className="text-slate-900 text-xs" />}
          </button>
        </div>

        {/* Back */}
        <button 
          onClick={() => navigate(-1)} 
          className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${theme.textMuted} hover:text-indigo-500 transition-colors mb-12`}
        >
          <FaArrowLeft /> Return to Studio
        </button>

        {/* Header */}
        <div className="mb-14">
          <h2 className={`text-5xl lg:text-6xl font-black tracking-tighter ${theme.textMain} leading-tight`}>
            Verify<br />
            <span className="font-extralight italic opacity-30">Identity</span>
          </h2>
          <div className="h-1.5 w-16 bg-indigo-600 mt-8 rounded-full" />
        </div>

        <form onSubmit={handleVerify} className="space-y-12">
          
          {/* Email */}
          <div className="relative group opacity-50">
            <label className={`text-[9px] font-black uppercase tracking-[0.4em] ${theme.textMuted} mb-3 block ml-1`}>
              Authentication Path
            </label>
            <div className={`relative flex items-center border-b ${theme.inputBorder}`}>
              <FaEnvelope className="absolute left-0 text-indigo-500 opacity-40" />
              <input
                type="email"
                value={email}
                disabled
                className={`w-full bg-transparent py-4 pl-8 text-md font-light outline-none ${theme.textMain} cursor-not-allowed`}
              />
            </div>
          </div>

          {/* OTP */}
          <div className="relative group">
            <label className={`text-[9px] font-black uppercase tracking-[0.4em] ${theme.textMuted} mb-3 block ml-1 group-focus-within:text-indigo-500 transition-colors`}>
              Atelier Passcode
            </label>
            <div className={`relative flex items-center border-b ${theme.inputBorder} group-focus-within:border-indigo-500 transition-all duration-700`}>
              <FaKey className="absolute left-0 opacity-20 text-indigo-500" />
              <input
                type="text"
                maxLength={6}
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`w-full bg-transparent py-4 pl-8 text-3xl tracking-[0.5em] font-light outline-none ${theme.textMain} placeholder:opacity-10`}
              />
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <p className={`text-[10px] font-bold ${theme.textMuted} uppercase tracking-tighter`}>
                Waiting for transmission...
              </p>
              <button type="button" className="text-[10px] font-black uppercase text-indigo-500 hover:text-indigo-400 transition-colors tracking-widest">
                Resend OTP
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <motion.button 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className={`w-full py-6 rounded-2xl text-white font-bold text-[11px] uppercase tracking-[0.5em] transition-all ${theme.button}`}
            >
              Confirm Access
            </motion.button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 opacity-20">
             <FaShieldAlt className={theme.textMain} />
             <span className={`text-[8px] font-bold uppercase tracking-[0.3em] ${theme.textMain}`}>
               End-to-End Encrypted
             </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default MainVerifyOtp;