import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaCity, FaGlobe, FaCamera, FaSearch, FaCheckCircle } from "react-icons/fa";

interface CustomerErrors {
  emailid?: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  gender?: string;
  profilepic?: string;
}

interface CustomerState {
  emailid: string;
  name: string;
  address: string;
  city: string;
  state: string;
  gender: string;
  profilepic: File | null;
  errors: CustomerErrors;
}

export default function ProfileCustomer() {
  const [isDark, setIsDark] = useState(true);
  const [form, setForm] = useState<CustomerState>({
    emailid: "",
    name: "",
    address: "",
    city: "",
    state: "",
    gender: "",
    profilepic: null,
    errors: {}
  });

  const [profilePreview, setProfilePreview] = useState<string | null>(null);


  const theme = {
    canvas: isDark ? "bg-[#0a0a0f]" : "bg-[#f8fafc]",
    container: isDark ? "bg-white/[0.03] border-white/10" : "bg-white/70 border-slate-200",
    textMain: isDark ? "text-white" : "text-slate-900",
    textMuted: isDark ? "text-zinc-500" : "text-slate-400",
    inputBorder: isDark ? "border-white/10 focus:border-indigo-500" : "border-slate-200 focus:border-indigo-600",
    panel: isDark ? "bg-white/[0.02]" : "bg-slate-50",
  };

 
  const validateField = (name: string, value: any) => {
    const safeValue = value ? String(value) : "";
    if (name === "emailid") {
      if (!safeValue.trim()) return "Email required";
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(safeValue)) return "Invalid email";
    }
    if (name === "name" && !safeValue.trim()) return "Name required";
    if (name === "address" && !safeValue.trim()) return "Address required";
    if (name === "city" && !safeValue.trim()) return "City required";
    if (name === "state" && !safeValue.trim()) return "State required";
    if (name === "gender" && !safeValue) return "Select gender";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setForm((prev) => ({ ...prev, [name]: value, errors: { ...prev.errors, [name]: errorMessage } }));
  };

  const validate = () => {
    const errors: CustomerErrors = {};
    ["emailid", "name", "address", "city", "state", "gender"].forEach((field) => {
      const error = validateField(field, form[field as keyof CustomerState]);
      if (error) errors[field as keyof CustomerErrors] = error;
    });
    if (!form.profilepic && !profilePreview) errors.profilepic = "Profile picture required";
    setForm((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, profilepic: file, errors: { ...prev.errors, profilepic: "" } }));
    if (file) setProfilePreview(URL.createObjectURL(file));
  };

  const handleSearch = async () => {
    if (!form.emailid) { alert("Enter Email First"); return; }
    try {
      const res = await axios.post("https://tailor-project-backend.vercel.app/customer/search", { emailid: form.emailid });
      if (res.data.status) {
        const data = res.data.customer;
        setForm((prev) => ({
          ...prev,
          emailid: data.emailid || "",
          name: data.name || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          gender: data.gender || "",
          profilepic: null,
          errors: {},
        }));
        setProfilePreview(data.picurl ? `https://tailor-project-backend.vercel.app/uploads/${data.picurl}` : null);
      }
    } catch (err) {
      alert("Customer Not Found");
      setProfilePreview(null);
    }
  };

  const handleSave = async () => {
    if (!validate()) return;
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "errors" && key !== "profilepic") data.append(key, (form as any)[key]);
    });
    if (form.profilepic) data.append("profilepic", form.profilepic);
    try {
      const res = await axios.post("https://tailor-project-backend.vercel.app/customer/save", data);
      alert(res.data.msg);
      setProfilePreview(null);
      setForm({ emailid: "", name: "", address: "", city: "", state: "", gender: "", profilepic: null, errors: {} });
    } catch (err: any) { alert(err.response?.data?.msg || "Save Failed"); }
  };

  const handleUpdate = async () => {
    if (!validate()) return;
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "errors" && key !== "profilepic") data.append(key, (form as any)[key]);
    });
    if (form.profilepic) data.append("profilepic", form.profilepic);
    try {
      const res = await axios.post("https://tailor-project-backend.vercel.app/customer/update", data);
      alert(res.data.msg);
      if (form.profilepic) setProfilePreview(URL.createObjectURL(form.profilepic));
      setForm((prev) => ({ ...prev, profilepic: null }));
    } catch (err: any) { alert(err.response?.data?.msg || "Update Failed"); }
  };

  return (
    <div className={`min-h-screen ${theme.canvas} transition-colors duration-1000 flex items-center justify-center p-6 relative overflow-hidden font-sans`}>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-[-10%] left-[-5%] w-150 h-150 rounded-full blur-[120px] opacity-20 transition-all duration-1000 ${isDark ? 'bg-indigo-600' : 'bg-indigo-200'}`} />
        <div className={`absolute bottom-[-10%] right-[-5%] w-150 h-150 rounded-full blur-[120px] opacity-10 transition-all duration-1000 ${isDark ? 'bg-purple-600' : 'bg-purple-200'}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-7xl backdrop-blur-3xl ${theme.container} border shadow-2xl rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row z-10`}
      >
        
        {/* THEME SWITCHER */}
        <div className="absolute top-10 right-10 z-30">
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`flex items-center gap-3 px-5 py-2 rounded-full border ${theme.container} shadow-sm backdrop-blur-md transition-transform active:scale-95`}
          >
            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-indigo-600'}`}></div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.textMain}`}>
              {isDark ? 'Luminous' : 'Nocturnal'}
            </span>
          </button>
        </div>

        {/* LEFT: FORM SECTION */}
        <div className="w-full lg:w-[60%] p-10 lg:p-20 border-r border-white/5">
          <header className="mb-16">
            <h1 className={`text-6xl font-black tracking-tighter ${theme.textMain} leading-none`}>
              Client<br />
              <span className="font-extralight italic opacity-30 text-5xl">Profile</span>
            </h1>
            <div className="h-1 w-12 bg-indigo-600 mt-8 rounded-full" />
          </header>

          <div className="space-y-12">
            {/* Search Identity */}
            <div className="group relative">
              <label className={`text-[9px] font-black uppercase tracking-[0.4em] ${theme.textMuted} mb-2 block`}>Registry Identifier</label>
              <div className={`relative flex items-center border-b-2 ${theme.inputBorder} transition-all duration-500`}>
                <FaEnvelope className="absolute left-0 opacity-20 text-indigo-500" />
                <input
                  name="emailid"
                  value={form.emailid}
                  onChange={handleChange}
                  placeholder="master@studio.com"
                  className={`w-full bg-transparent py-4 pl-8 text-xl font-light outline-none ${theme.textMain} placeholder:opacity-10`}
                />
                <button 
                  onClick={handleSearch}
                  className="absolute right-0 bottom-4 p-2 rounded-full hover:bg-indigo-600/10 transition-colors text-indigo-500"
                >
                  <FaSearch className="text-sm" />
                </button>
              </div>
              {form.errors.emailid && <p className="absolute text-[10px] text-rose-500 font-bold mt-2 italic">{form.errors.emailid}</p>}
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-1 block`}>Full Name</label>
                <div className={`flex items-center border-b ${theme.inputBorder} transition-colors`}>
                  <FaUser className="absolute left-0 opacity-10 text-indigo-500" />
                  <input name="name" value={form.name} onChange={handleChange} className={`w-full bg-transparent py-3 pl-8 text-md font-light outline-none ${theme.textMain}`} />
                </div>
              </div>

              <div className="relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-1 block`}>City</label>
                <div className={`flex items-center border-b ${theme.inputBorder} transition-colors`}>
                  <FaCity className="absolute left-0 opacity-10 text-indigo-500" />
                  <input name="city" value={form.city} onChange={handleChange} className={`w-full bg-transparent py-3 pl-8 text-md font-light outline-none ${theme.textMain}`} />
                </div>
              </div>

              <div className="relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-1 block`}>State / Province</label>
                <div className={`flex items-center border-b ${theme.inputBorder} transition-colors`}>
                  <FaGlobe className="absolute left-0 opacity-10 text-indigo-500" />
                  <input name="state" value={form.state} onChange={handleChange} className={`w-full bg-transparent py-3 pl-8 text-md font-light outline-none ${theme.textMain}`} />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-1 block`}>Street Address</label>
                <div className={`flex items-center border-b ${theme.inputBorder} transition-colors`}>
                  <FaMapMarkerAlt className="absolute left-0 opacity-10 text-indigo-500" />
                  <input name="address" value={form.address} onChange={handleChange} className={`w-full bg-transparent py-3 pl-8 text-md font-light outline-none ${theme.textMain}`} />
                </div>
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className={`text-[9px] font-black uppercase tracking-[0.4em] ${theme.textMuted} mb-6 block`}>Gender Classification</label>
              <div className="flex gap-4">
                {["Male", "Female"].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => handleChange({ target: { name: 'gender', value: opt } } as any)}
                    className={`flex-1 py-4 rounded-2xl border transition-all duration-500 text-[10px] font-black uppercase tracking-widest ${form.gender === opt ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/40' : `border-white/5 opacity-30 ${theme.textMain}`}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <button onClick={handleSave} className="flex-1 py-6 rounded-2xl bg-indigo-600 text-white font-black text-[11px] uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:-translate-y-1 transition-all">
                Commit Assets
              </button>
              <button onClick={handleUpdate} className={`flex-1 py-6 rounded-2xl border-2 font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white/5 transition-all ${isDark ? 'border-white text-white' : 'border-black text-black'}`}>
                Push Update
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: PORTRAIT CAPTURE */}
        <div className={`w-full lg:w-[40%] p-12 lg:p-20 flex flex-col items-center justify-center relative ${theme.panel}`}>
          <div className="relative group">
            {/* Spinning Biometric Ring */}
            <div className={`absolute inset-7.5 rounded-full border border-dashed animate-spin-slow opacity-20 ${isDark ? 'border-white' : 'border-indigo-600'}`}></div>
            
            <div className={`relative w-80 h-80 rounded-full p-2 border-2 border-white/10 shadow-3xl transition-all duration-700`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center relative">
                {profilePreview ? (
                  <img src={profilePreview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Client Portrait" />
                ) : (
                  <div className="text-center opacity-10">
                    <FaUser className="text-8xl text-white mb-4 mx-auto" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">No Asset</p>
                  </div>
                )}
                
                {/* Upload Overlay */}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <FaCamera className="text-white text-3xl" />
                  <input type="file" onChange={handleFile} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className={`text-2xl font-black tracking-tighter ${theme.textMain}`}>Account Portrait</h3>
            <p className={`text-[10px] mt-2 font-bold uppercase tracking-widest opacity-40 ${theme.textMain}`}>Directory Verification Capture</p>
            {form.errors.profilepic && <p className="text-rose-500 text-[10px] font-black uppercase mt-6 tracking-[0.2em] animate-pulse">{form.errors.profilepic}</p>}
          </div>

          {/* Verification Badge */}
          <div className="mt-12 flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/5 opacity-50">
            <FaCheckCircle className="text-indigo-500 text-xs" />
            <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${theme.textMain}`}>Verified Status</span>
          </div>

          {/* Luxury Watermark */}
          <div className="absolute bottom-12 opacity-5 pointer-events-none select-none">
            <h1 className="text-8xl font-black italic tracking-tighter text-indigo-500">CLIENT</h1>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  );
}