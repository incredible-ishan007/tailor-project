import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMoon, FaSun, FaUser, FaCut, FaMapMarkerAlt,
  FaCamera, FaIdCard, FaCloudUploadAlt, FaChevronDown, FaCheck, FaSpinner, FaLock
} from "react-icons/fa";

interface TailorErrors {
  emailid?: string; name?: string; contact?: string; address?: string;
  city?: string; aadharno?: string; category?: string; speciality?: string;
  website?: string; since?: string; worktype?: string; shopaddr?: string;
  shopcity?: string; otherinfo?: string; profilepic?: string; aadharcard?: string;
  dob?: string; gender?: string;
}

interface TailorState {
  emailid: string; name: string; contact: string; address: string;
  city: string; aadharno: string; dob: string; gender: string; 
  category: string[]; speciality: string;
  website: string; since: string; worktype: string; shopaddr: string;
  shopcity: string; otherinfo: string; profilepic: File | null;
  aadharcard: File | null; errors: TailorErrors;
}

export default function ProfileTailor() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState("Personal");
  const [isScanning, setIsScanning] = useState(false);

  const [form, setForm] = useState<TailorState>({
    emailid: "", name: "", contact: "", address: "", city: "", 
    aadharno: "", dob: "", gender: "", 
    category: [], speciality: "", website: "", since: "", worktype: "",
    shopaddr: "", shopcity: "", otherinfo: "", profilepic: null, aadharcard: null,
    errors: {}
  });

  const [previews, setPreviews] = useState({ profile: "", aadhar: "" });
  const categories = ["Men", "Women", "Children"];

  const tabs = [
    { id: "Personal", icon: <FaUser className="text-[10px]" /> },
    { id: "Professional", icon: <FaCut className="text-[10px]" /> },
    ...(form.worktype === "Shop" || form.worktype === "Both" 
      ? [{ id: "Studio", icon: <FaMapMarkerAlt className="text-[10px]" /> }] 
      : [])
  ];

  useEffect(() => {
    if (activeTab === "Studio" && form.worktype === "Home") {
      setActiveTab("Personal");
    }
  }, [form.worktype, activeTab]);

  const theme = {
    canvas: isDark ? "bg-gradient-to-br from-[#0a0a0f] via-[#0f0f17] to-[#0a0a0f]" : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9]",
    container: isDark ? "bg-white/[0.03] border-white/10 backdrop-blur-3xl" : "bg-white/60 border-white/40 backdrop-blur-3xl shadow-xl",
    textMain: isDark ? "text-white" : "text-slate-900",
    textMuted: isDark ? "text-zinc-400" : "text-slate-500",
    input: "w-full bg-transparent border-b py-3 text-md font-light outline-none transition-all duration-500 focus:scale-[1.02] focus:shadow-[0_0_20px_rgba(99,102,241,0.3)]",
    inputBorder: isDark ? "border-white/10 focus:border-indigo-500/80" : "border-slate-300 focus:border-indigo-500",
    panel: isDark ? "bg-white/[0.02] backdrop-blur-xl" : "bg-white/50 backdrop-blur-xl",
    button: "bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg"
  };

  const validateField = (name: string, value: any) => {
    if (["otherinfo", "website", "dob", "gender", "aadharno"].includes(name)) return "";
    if ((name === "shopaddr" || name === "shopcity") && form.worktype === "Home") return "";
    const safeValue = value ? String(value) : "";
    if (name === "emailid" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(safeValue)) return "Invalid email";
    if (name === "contact" && safeValue.length !== 10) return "10 digits required";
    if (name === "category" && (!value || value.length === 0)) return "Select at least one";
    if (!safeValue.trim()) return "Required";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    if (name === "contact") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) return;
      value = numericValue;
    }

    setForm(prev => ({ 
      ...prev, 
      [name]: value, 
      errors: { ...prev.errors, [name]: validateField(name, value) } 
    }));
  };

  const handleCategoryToggle = (cat: string) => {
    setForm(prev => {
      const current = prev.category.includes(cat) ? prev.category.filter(c => c !== cat) : [...prev.category, cat];
      return { ...prev, category: current, errors: { ...prev.errors, category: validateField("category", current) } };
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>, field: "profilepic" | "aadharcard") => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setPreviews(p => ({ ...p, [field === "profilepic" ? "profile" : "aadhar"]: URL.createObjectURL(file) }));
    setForm(prev => ({ ...prev, [field]: file, errors: { ...prev.errors, [field]: "" } }));

    if (field === "aadharcard") {
      setIsScanning(true);
      const data = new FormData();
      data.append("aadharcard", file);

      try {
        const res = await axios.post("http://tailor-project-backend.vercel.app/tailor/extract-aadhar", data);
        if (res.data.status) {
          setForm(prev => ({
            ...prev,
            aadharno: res.data.aadhaarno?.replace(/\D/g, "").substring(0, 12) || prev.aadharno,
            dob: res.data.dob || prev.dob,
            gender: res.data.gender || prev.gender
          }));
        }
      } catch (err) {
        console.error("Scanning Error:", err);
      } finally {
        setIsScanning(false);
      }
    }
  };

  const validate = () => {
    const errors: TailorErrors = {};
    const baseFields = ["emailid", "name", "contact", "address", "city", "aadharno", "category", "speciality", "since", "worktype"];
    if (form.worktype === "Shop" || form.worktype === "Both") baseFields.push("shopaddr", "shopcity");
    baseFields.forEach(f => {
      const err = validateField(f, (form as any)[f]);
      if (err) (errors as any)[f] = err;
    });
    if (!form.profilepic && !previews.profile) errors.profilepic = "Required";
    if (!form.aadharcard && !previews.aadhar) errors.aadharcard = "Required";
    if (!form.aadharno) errors.aadharno = "Please upload Aadhaar card to extract number";
    
    setForm(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const submitToAPI = async () => {
    if (!validate()) return;
    const data = new FormData();
    Object.keys(form).forEach(k => {
      if (k === "category") data.append(k, JSON.stringify(form.category));
      else if (k !== "errors" && (form as any)[k]) data.append(k, (form as any)[k]);
    });
    try {
      await axios.post("http://tailor-project-backend.vercel.app/tailor/save", data);
      alert("Profile synchronized.");
    } catch { alert("Sync failed."); }
  };

  const personalFields = ["name", "dob", "emailid", "gender", "contact", "aadharno", "city", "address"];

  return (
    <div className={`min-h-screen ${theme.canvas} transition-all duration-700 flex items-center justify-center p-6 relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-25 right-25 w-150 h-150 rounded-full blur-[160px] opacity-20 ${isDark ? "bg-indigo-600" : "bg-indigo-300"}`} />
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className={`relative w-full max-w-7xl ${theme.container} border rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row z-10`}>
        <div className="absolute top-8 right-8 z-30">
          <button onClick={() => setIsDark(!isDark)} className="px-5 py-2 rounded-full border border-white/20 backdrop-blur-md transition">
            {isDark ? <FaMoon className="text-white" /> : <FaSun className="text-amber-500" />}
          </button>
        </div>

        <div className="w-full lg:w-[60%] p-10 lg:p-16 border-r border-white/10">
          <h1 className={`text-5xl font-black mb-12 ${theme.textMain}`}>Tailor Master Profile</h1>
          
          <div className="flex gap-10 border-b border-white/10 mb-10 relative">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`pb-4 text-xs font-bold tracking-widest uppercase relative flex items-center gap-2 ${activeTab === tab.id ? theme.textMain : "text-zinc-500"}`}>
                {tab.icon} {tab.id}
                {activeTab === tab.id && <motion.div layoutId="ind" className="absolute bottom-0 left-0 right-0 h-0.75 rounded-full bg-linear-to-r from-indigo-500 to-violet-500" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              
              {activeTab === "Personal" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {personalFields.map(f => {
                    const isLocked = ["dob", "gender", "aadharno"].includes(f);
                    
                    return (
                      <div key={f} className={`relative w-full ${f === "address" ? "md:col-span-2" : ""}`}>
                        <input 
                          name={f} 
                          value={(form as any)[f]} 
                          onChange={handleChange} 
                          readOnly={isLocked}
                          placeholder={f === "aadharno" ? "AADHAAR NUMBER (AUTO)" : f.toUpperCase()} 
                          className={`${theme.input} ${theme.inputBorder} ${theme.textMain} ${isLocked ? "opacity-50 cursor-not-allowed border-dashed" : ""}`} 
                        />
                        {isLocked && (
                          <div className="absolute right-0 top-1 flex items-center gap-1 opacity-60">
                            <span className="text-[8px] font-bold text-indigo-500">AUTO-LOCKED</span>
                            <FaLock className="text-[8px] text-indigo-500" />
                          </div>
                        )}
                        {form.errors[f as keyof TailorErrors] && <p className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-bold italic">{form.errors[f as keyof TailorErrors]}</p>}
                      </div>
                    );
                   })}
                </div>
              )}

              {activeTab === "Professional" && ["category", "speciality", "website", "since", "worktype"].map(f => (
                <div key={f} className="relative w-full">
                  {f === "category" ? (
                    <div className="space-y-4">
                      <label className={`text-[10px] uppercase font-black ${theme.textMuted}`}>Category (Required)</label>
                      <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                          <button key={cat} type="button" onClick={() => handleCategoryToggle(cat)} className={`px-6 py-2 rounded-full border text-[11px] font-bold transition-all ${form.category.includes(cat) ? "bg-indigo-600 border-indigo-500 text-white shadow-lg" : `${isDark ? "border-white/10 text-white/40" : "border-slate-300 text-slate-500"}`}`}>
                            {cat} {form.category.includes(cat) && <FaCheck className="inline ml-1 text-[9px]" />}
                          </button>
                        ))}
                      </div>
                      {form.errors.category && <p className="text-[10px] text-rose-500 font-bold italic">{form.errors.category}</p>}
                    </div>
                  ) : f === "worktype" ? (
                    <div className="relative group">
                      <select name={f} value={(form as any)[f]} onChange={handleChange} className={`${theme.input} ${theme.inputBorder} ${theme.textMain} appearance-none cursor-pointer pr-10 uppercase`}>
                        <option value="" className={isDark ? "bg-[#0f0f17]" : "bg-white"}>SELECT WORK TYPE</option>
                        <option value="Home" className={isDark ? "bg-[#0f0f17]" : "bg-white"}>HOME</option>
                        <option value="Shop" className={isDark ? "bg-[#0f0f17]" : "bg-white"}>SHOP</option>
                        <option value="Both" className={isDark ? "bg-[#0f0f17]" : "bg-white"}>BOTH</option>
                      </select>
                      <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] opacity-40 pointer-events-none" />
                    </div>
                  ) : (
                    <input name={f} value={(form as any)[f]} onChange={handleChange} placeholder={f === "website" ? "WEBSITE (OPTIONAL)" : f.toUpperCase()} className={`${theme.input} ${theme.inputBorder} ${theme.textMain}`} />
                  )}
                  {f !== "category" && form.errors[f as keyof TailorErrors] && <p className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-bold italic">{form.errors[f as keyof TailorErrors]}</p>}
                </div>
              ))}

              {activeTab === "Studio" && ["shopaddr", "shopcity", "otherinfo"].map(f => (
                <div key={f} className="relative w-full">
                  <input name={f} value={(form as any)[f]} onChange={handleChange} placeholder={f === "otherinfo" ? "OTHER INFO (OPTIONAL)" : f.toUpperCase()} className={`${theme.input} ${theme.inputBorder} ${theme.textMain}`} />
                  {form.errors[f as keyof TailorErrors] && <p className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-bold italic">{form.errors[f as keyof TailorErrors]}</p>}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="pt-12">
            <button onClick={submitToAPI} className={`w-full py-5 rounded-2xl text-white font-bold uppercase tracking-widest transition ${theme.button}`}>Synchronize Profile</button>
          </div>
        </div>

        <div className={`w-full lg:w-[40%] p-12 flex flex-col items-center justify-center gap-14 ${theme.panel}`}>
          <div className="relative group text-center">
            <div className="w-52 h-52 rounded-full border border-white/20 p-3 overflow-hidden bg-black/40 flex items-center justify-center relative">
              {previews.profile ? <img src={previews.profile} className="w-full h-full object-cover rounded-full" /> : <FaCamera className="text-white/20 text-4xl" />}
              <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition">
                <FaCloudUploadAlt className="text-white text-2xl" />
                <input type="file" onChange={e => handleFile(e, "profilepic")} className="hidden" />
              </label>
            </div>
            {form.errors.profilepic && <p className="text-rose-500 text-[10px] font-black mt-2">{form.errors.profilepic}</p>}
          </div>

          <div className="w-full max-w-75 flex flex-col items-center">
            <div className={`aspect-[1.6/1] w-full rounded-2xl border-2 border-dashed ${isDark ? "border-white/20 bg-white/3" : "border-slate-300 bg-white"} overflow-hidden relative group`}>
              {isScanning && (
                <div className="absolute inset-0 bg-indigo-600/60 backdrop-blur-md z-20 flex flex-col items-center justify-center text-white">
                  <FaSpinner className="animate-spin text-3xl mb-2" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Scanning ID...</span>
                </div>
              )}
              {previews.aadhar ? <img src={previews.aadhar} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center justify-center h-full"><FaIdCard className="text-4xl mb-2 opacity-20" /><p className="text-xs uppercase opacity-40">Aadhaar Card</p></div>}
              <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition">
                <FaCloudUploadAlt className="text-white text-2xl" />
                <input type="file" onChange={e => handleFile(e, "aadharcard")} className="hidden" />
              </label>
            </div>
            <p className="mt-3 text-[9px] uppercase tracking-tighter opacity-40 text-center">Upload Card to Fill Details Above</p>
            {form.errors.aadharcard && <p className="text-rose-500 text-[10px] font-black mt-4">{form.errors.aadharcard}</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 