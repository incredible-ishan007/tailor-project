import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion} from "framer-motion"; 
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaMoon, FaSun } from "react-icons/fa";

interface LoginErrors { email?: string; password?: string; }
interface LoginState { email: string; password: string; showPassword: boolean; errors: LoginErrors; }

const MainLogin = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [form, setForm] = useState<LoginState>({
    email: "",
    password: "",
    showPassword: false,
    errors: {},
  });

  const theme = {
    canvas: isDark
      ? "bg-gradient-to-br from-[#0a0a0f] via-[#0f0f17] to-[#0a0a0f]"
      : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9]",
    container: isDark
      ? "bg-white/[0.03] border-white/10 backdrop-blur-3xl"
      : "bg-white/60 border-white/40 backdrop-blur-3xl shadow-[0_10px_50px_rgba(0,0,0,0.05)]",
    textMain: isDark ? "text-white" : "text-slate-900",
    textMuted: isDark ? "text-zinc-400" : "text-slate-500",
    input: "w-full bg-transparent border-b py-3 text-md font-light outline-none transition-all duration-500 focus:scale-[1.01]",
    inputBorder: isDark ? "border-white/10 focus:border-indigo-500/80" : "border-slate-300 focus:border-indigo-500",
    panel: isDark ? "bg-white/[0.02] backdrop-blur-xl" : "bg-white/50 backdrop-blur-xl",
    button: "bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 shadow-[0_20px_60px_rgba(99,102,241,0.4)]",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://tailor-project-backend.vercel.app/user/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.msg);

      // ✅ FIXED PART
      const role = localStorage.getItem("role");

      if (role === "tailor") {
        navigate("/tailor");
      } else {
        navigate("/user"); // 🔥 FIXED
      }

    } catch (error: any) {
      alert(error.response?.data?.msg || "Login Failed");
    }
  };

  return (
    <div className={`min-h-screen ${theme.canvas} transition-all duration-700 flex items-center justify-center p-6 relative overflow-hidden font-sans`}>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-25 left-25 w-150 h-150 rounded-full blur-[160px] opacity-20 ${isDark ? "bg-indigo-600" : "bg-indigo-300"}`} />
        <div className={`absolute bottom-30 right-30 w-125 h-125rounded-full blur-[140px] opacity-10 ${isDark ? "bg-violet-500" : "bg-pink-200"}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-7xl ${theme.container} border rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col lg:flex-row z-10`}
      >
        
        <div className="absolute top-8 right-8 z-30">
          <button onClick={() => setIsDark(!isDark)} className="px-5 py-2 rounded-full border border-white/20 backdrop-blur-md hover:scale-105 transition">
            {isDark ? <FaSun className="text-white" /> : <FaMoon className="text-slate-900" />}
          </button>
        </div>

        <div className={`w-full lg:w-[40%] p-12 lg:p-20 flex flex-col justify-center border-r border-white/10 ${theme.panel}`}>
          <h1 className={`text-6xl lg:text-8xl font-black tracking-tighter ${theme.textMain} leading-[0.85]`}>
            Welcome<br />
            <span className="font-extralight italic opacity-30">Back</span>
          </h1>
          <div className="h-1 w-12 bg-indigo-600 mt-12 rounded-full" />
          
          <p className={`mt-10 text-sm font-medium leading-relaxed ${theme.textMuted} max-w-xs`}>
            Enter the studio dashboard to continue managing your craft with digital precision.
          </p>

          <div className="mt-16 space-y-6">
            {['Secured Gateway', 'Real-time Sync'].map((text) => (
              <div key={text} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <FaCheckCircle className="text-xs" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 ${theme.textMain}`}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[60%] p-10 lg:p-20 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            <div className="space-y-10">

              <div className="relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-2 block`}>Credential</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-0 top-4 opacity-20 text-indigo-500" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@studio.com"
                    className={`${theme.input} ${theme.inputBorder} ${theme.textMain} pl-8`}
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="flex justify-between items-end mb-2">
                  <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} block`}>Security</label>
                  <button type="button" className="text-[9px] font-bold uppercase tracking-widest text-indigo-500 hover:opacity-100 opacity-60 transition-all">Forgot Password?</button>
                </div>
                <div className="relative">
                  <FaLock className="absolute left-0 top-4 opacity-20 text-indigo-500" />
                  <input
                    name="password"
                    type={form.showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`${theme.input} ${theme.inputBorder} ${theme.textMain} pl-8 pr-12`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setForm(p => ({...p, showPassword: !p.showPassword}))} 
                    className="absolute right-0 top-4 text-slate-400 hover:text-indigo-500 transition"
                  >
                    {form.showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className={`w-full py-6 rounded-2xl text-white font-bold text-[11px] uppercase tracking-[0.5em] transition-all ${theme.button}`}
              >
                Authorize Access
              </motion.button>

              <div className="flex flex-col items-center gap-2">
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${theme.textMuted}`}>
                  New to the platform?
                </p>
                <button 
                  type="button" 
                  onClick={() => navigate("/signup")} 
                  className="text-indigo-500 hover:text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-indigo-500/30 pb-1"
                >
                  Create Your Account
                </button>
              </div>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default MainLogin;