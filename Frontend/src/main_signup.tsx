import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion} from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaEye, FaEyeSlash, FaCheckCircle, FaSun, FaMoon } from "react-icons/fa";

interface SignupErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: string;
}

interface SignupState {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "customer" | "tailor" | null;
  showPassword: boolean;
  errors: SignupErrors;
}

const MainSignup = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);
  const [form, setForm] = useState<SignupState>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: null,
    showPassword: false,
    errors: {},
  });

  const validateField = (name: string, value: string | null) => {
    if (name === "fullName" && !value?.trim()) return "Full name required";
    if (name === "email") {
      if (!value?.trim()) return "Email required";
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return "Invalid email address";
    }
    if (name === "phone") {
      if (!value?.trim()) return "Phone required";
      if (!/^[0-9]{10}$/.test(value)) return "10 digits required";
    }
    if (name === "password") {
      if (!value) return "Password required";
      if (value.length < 8) return "Min 8 characters";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === "phone") value = value.replace(/\D/g, "");
    const errorMessage = validateField(name, value);
    setForm((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: errorMessage },
    }));
  };

  const handleRoleChange = (value: "customer" | "tailor") => {
    setForm({ ...form, role: value, errors: { ...form.errors, role: "" } });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://tailor-project-backend.vercel.app/user/signup", {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      });
    let jwt=response.data.token;
    localStorage.setItem("token",jwt);

      alert(response.data.msg);
    navigate("/verify", { 
  state: { email: form.email,role: form.role  }});
    } catch (error: any) {
      alert(error.response?.data?.msg || "Registration Failed");
    }
  };

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

  return (
    <div className={`min-h-screen ${theme.canvas} transition-all duration-700 flex items-center justify-center p-6 relative overflow-hidden`}>
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-25 left-25 w-150 h-150 rounded-full blur-[160px] opacity-20 ${isDark ? "bg-indigo-600" : "bg-indigo-300"}`} />
        <div className={`absolute bottom-30 right-30 w-125 h-125 rounded-full blur-[140px] opacity-10 ${isDark ? "bg-violet-500" : "bg-pink-200"}`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-7xl ${theme.container} border rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col lg:flex-row z-10`}
      >
        {/* Theme Switcher */}
        <div className="absolute top-8 right-8 z-30">
          <button onClick={() => setIsDark(!isDark)} className="px-5 py-2 rounded-full border border-white/20 backdrop-blur-md hover:scale-105 transition">
            {isDark ? <FaSun className="text-white" /> : <FaMoon className="text-slate-900" />}
          </button>
        </div>

        {/* Left Side: Branding */}
        <div className={`w-full lg:w-[40%] p-12 lg:p-20 flex flex-col justify-center border-r border-white/10 ${theme.panel}`}>
          <h1 className={`text-6xl lg:text-8xl font-black tracking-tighter ${theme.textMain} leading-[0.85]`}>
            Start Your<br />
            <span className="font-extralight italic opacity-30">Atelier</span>
          </h1>
          <div className="h-1 w-12 bg-indigo-600 mt-12 rounded-full"></div>
          
          <p className={`mt-10 text-sm font-medium leading-relaxed ${theme.textMuted} max-w-xs`}>
            Join the elite circle of master tailors and fashion enthusiasts.
          </p>

          <div className="mt-16 space-y-6">
            {['Global Craft Network', 'Secure Authentication'].map((text) => (
              <div key={text} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <FaCheckCircle className="text-xs" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 ${theme.textMain}`}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-[60%] p-10 lg:p-20">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              
              {/* Full Name */}
              <div className="col-span-2 relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-2 block`}>Identity</label>
                <div className="relative">
                  <FaUser className="absolute left-0 top-4 opacity-20 text-indigo-500" />
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Master Name"
                    className={`${theme.input} ${theme.inputBorder} ${theme.textMain} pl-8`}
                  />
                  {form.errors.fullName && <p className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-bold italic">{form.errors.fullName}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-2 block`}>Communication</label>
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
                  {form.errors.email && <p className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-bold italic">{form.errors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div className="relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-2 block`}>Contact</label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-0 top-4 opacity-20 text-indigo-500" />
                  <input
                    name="phone"
                    maxLength={10}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile"
                    className={`${theme.input} ${theme.inputBorder} ${theme.textMain} pl-8`}
                  />
                  {form.errors.phone && <p className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-bold italic">{form.errors.phone}</p>}
                </div>
              </div>

              {/* Password */}
              <div className="col-span-2 relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-2 block`}>Security</label>
                <div className="relative">
                  <FaLock className="absolute left-0 top-4 opacity-20 text-indigo-500" />
                  <input
                    name="password"
                    type={form.showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`${theme.input} ${theme.inputBorder} ${theme.textMain} pl-8 pr-10`}
                  />
                  <button type="button" onClick={() => setForm(p => ({...p, showPassword: !p.showPassword}))} className="absolute right-0 top-4 text-slate-400 hover:text-indigo-500 transition">
                    {form.showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {form.errors.password && <p className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-bold italic">{form.errors.password}</p>}
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="pt-6">
              <label className={`text-[9px] font-black uppercase tracking-[0.4em] ${theme.textMuted} text-center block mb-6`}>Select Persona</label>
              <div className="flex gap-4">
                {["customer", "tailor"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(r as any)}
                    className={`flex-1 py-5 rounded-2xl border-2 transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] ${form.role === r 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-500/40' 
                      : `bg-white/5 border-transparent ${theme.textMain} opacity-30 hover:opacity-100 hover:border-white/20`}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-10">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className={`w-full py-6 rounded-2xl text-white font-bold text-[11px] uppercase tracking-[0.5em] transition-all ${theme.button}`}
              >
                Create Account
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default MainSignup;