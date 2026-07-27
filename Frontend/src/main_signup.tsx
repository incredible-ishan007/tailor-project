import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaEye, FaEyeSlash, 
  FaSun, FaMoon, FaStar, FaCut, FaArrowRight 
} from "react-icons/fa";

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
  const [isDark, setIsDark] = useState(false);
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
    if (!form.role) {
      alert("Please select a designation");
      return;
    }
    try {
      const response = await axios.post("https://tailor-project-backend.vercel.app/user/signup", {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      });

      alert(response.data.msg || "OTP sent to your email!");
      
      navigate("/verify-otp", { 
        state: { 
          email: form.email, 
          role: form.role 
        } 
      });
    } catch (error: any) {
      alert(error.response?.data?.msg || "Registration Failed");
    }
  };

  const theme = {
    canvas: isDark ? "bg-[#050505] text-[#e5e5e5]" : "bg-[#fbf9f5] text-[#1a1a1a]",
    card: isDark 
      ? "bg-white/[0.03] border-white/[0.08] backdrop-blur-2xl shadow-2xl" 
      : "bg-white/80 border-black/[0.08] shadow-2xl backdrop-blur-2xl",
    textMuted: isDark ? "text-zinc-500" : "text-zinc-600",
    accent: "#d4af37",
    input: `w-full bg-transparent border-b py-4 text-sm font-light outline-none transition-all duration-500 focus:scale-[1.01]`,
    inputBorder: isDark ? "border-white/10 focus:border-[#d4af37]" : "border-black/15 focus:border-[#d4af37]",
  };

  return (
    <div className={`min-h-screen ${theme.canvas} transition-colors duration-1000 font-sans selection:bg-[#d4af37]/30 flex items-center justify-center p-4 md:p-8 overflow-x-hidden relative`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif !important; }
      `}</style>

      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-[100] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[#d4af37]/10 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative w-full max-w-6xl ${theme.card} border rounded-[3rem] overflow-hidden flex flex-col lg:grid lg:grid-cols-12 z-10`}
      >
        <button 
          onClick={() => setIsDark(!isDark)} 
          className="absolute top-8 right-8 p-3 rounded-full hover:bg-black/5 transition-colors z-50 border border-black/10"
        >
          {isDark ? <FaSun className="text-[#d4af37]" /> : <FaMoon className="text-zinc-700" />}
        </button>

        <div className={`lg:col-span-5 p-12 md:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center">
                <FaCut className="text-black text-sm" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tighter uppercase">Atelier<span className="font-light opacity-40">Sync</span></span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif leading-[0.9] tracking-tighter mb-8">
              Join the <br />
              <span className="italic font-light opacity-40">Collective.</span>
            </h1>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 mb-8">
              <FaStar className="text-[#d4af37] text-[8px]" />
              <span className="text-[9px] font-black tracking-[0.3em] text-[#b38f28] uppercase">Elite Membership</span>
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <p className={`text-sm font-light leading-relaxed ${theme.textMuted} max-w-xs`}>
              "Everything begins with a single thread. Your journey to bespoke excellence starts here."
            </p>
            <div className="h-[1px] w-12 bg-[#d4af37]/60" />
          </div>
          
          <FaCut className="absolute -bottom-10 -left-10 text-[250px] opacity-[0.03] -rotate-12" />
        </div>

        <div className="lg:col-span-7 p-10 md:p-20">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              
              <div className="md:col-span-2 relative">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-2 block">The Individual</label>
                <div className="relative">
                  <FaUser className="absolute left-0 top-4 text-[#d4af37]" />
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="FULL NAME"
                    className={`${theme.input} ${theme.inputBorder} pl-8 uppercase tracking-widest`}
                  />
                  {form.errors.fullName && <span className="text-[9px] text-red-500 absolute -bottom-5 left-0 italic">{form.errors.fullName}</span>}
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-2 block">Correspondence</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-0 top-4 text-[#d4af37]" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="EMAIL ADDRESS"
                    className={`${theme.input} ${theme.inputBorder} pl-8 text-xs`}
                  />
                  {form.errors.email && <span className="text-[9px] text-red-500 absolute -bottom-5 left-0 italic">{form.errors.email}</span>}
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-2 block">Secure Line</label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-0 top-4 text-[#d4af37]" />
                  <input
                    name="phone"
                    maxLength={10}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="PHONE NUMBER"
                    className={`${theme.input} ${theme.inputBorder} pl-8`}
                  />
                  {form.errors.phone && <span className="text-[9px] text-red-500 absolute -bottom-5 left-0 italic">{form.errors.phone}</span>}
                </div>
              </div>

              <div className="md:col-span-2 relative">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-2 block">Encryption Key</label>
                <div className="relative">
                  <FaLock className="absolute left-0 top-4 text-[#d4af37]" />
                  <input
                    name="password"
                    type={form.showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="PASSWORD (MIN 8 CHARS)"
                    className={`${theme.input} ${theme.inputBorder} pl-8 pr-10`}
                  />
                  <button type="button" onClick={() => setForm(p => ({...p, showPassword: !p.showPassword}))} className="absolute right-0 top-4 opacity-50 hover:text-[#d4af37] transition-colors">
                    {form.showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {form.errors.password && <span className="text-[9px] text-red-500 absolute -bottom-5 left-0 italic">{form.errors.password}</span>}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 text-center block mb-6">Select Your Designation</label>
              <div className="flex gap-4">
                {["customer", "tailor"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(r as any)}
                    className={`flex-1 py-4 rounded-xl border transition-all duration-500 text-[10px] font-black uppercase tracking-[0.3em] ${
                      form.role === r 
                        ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-[0_10px_30px_rgba(212,175,55,0.25)]' 
                        : `bg-transparent ${isDark ? 'border-white/10 text-white' : 'border-black/15 text-black'} opacity-60 hover:opacity-100`
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                className="w-full group relative py-6 overflow-hidden rounded-2xl bg-[#d4af37] text-black font-bold text-[11px] uppercase tracking-[0.5em] shadow-lg transition-all"
              >
                <div className="flex items-center justify-center gap-3">
                  <span>Initialize Account</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
              
              <p className="text-center mt-8 text-[10px] font-medium tracking-[0.1em] opacity-50">
                Already have an account?{" "}
                <span 
                  onClick={() => navigate("/login")} 
                  className="underline cursor-pointer hover:text-[#d4af37] opacity-100 font-bold"
                >
                  Sign In
                </span>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default MainSignup;