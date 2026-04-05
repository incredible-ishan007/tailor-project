import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaCut, FaStar, FaPaperPlane, FaMoon, FaSun, FaPhoneAlt } from "react-icons/fa";

interface ReviewErrors {
  contact?: string;
  rating?: string;
  reviewText?: string;
}

interface ReviewState {
  contact: string;
  rating: number;
  reviewText: string;
  errors: ReviewErrors;
}

export default function TailorReview() {
  const [isDark, setIsDark] = useState(true);
  const [hover, setHover] = useState(0);
  const maxChars = 300;

  const [form, setForm] = useState<ReviewState>({
    contact: "",
    rating: 0,
    reviewText: "",
    errors: {}
  });

  const validateField = (name: string, value: any) => {
    if (name === "contact") {
      if (!value) return "Required";
      if (value.length !== 10) return "10 digits required";
    }
    if (name === "rating" && value === 0) return "Please select a rating";
    if (name === "reviewText" && !value.trim()) return "Required";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;
    if (name === "contact") value = value.replace(/\D/g, "").substring(0, 10);

    setForm(prev => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: validateField(name, value) }
    }));
  };

  const handleRating = (val: number) => {
    setForm(prev => ({
      ...prev,
      rating: val,
      errors: { ...prev.errors, rating: "" }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    const errors: ReviewErrors = {
      contact: validateField("contact", form.contact),
      rating: validateField("rating", form.rating),
      reviewText: validateField("reviewText", form.reviewText),
    };

    const hasErrors = Object.values(errors).some(err => err !== "");
    setForm(prev => ({ ...prev, errors }));

    if (!hasErrors) {
      try {
      
        const reviewData = {
          tailorContact: form.contact,
          rating: form.rating,
          reviewText: form.reviewText
        };

        const response = await axios.post("http://tailor-project-backend.vercel.app/customer/publish-review", reviewData);

        if (response.data.status === true) {
          alert("Review Published Successfully!");
          setForm({ contact: "", rating: 0, reviewText: "", errors: {} });
          setHover(0);
        } else {
          alert(response.data.msg);
        }
      } catch (error: any) {
        
        alert(error.response?.data?.msg || "Failed to publish review. Check server connection.");
      }
    }
  };

  const theme = {
    canvas: isDark ? "bg-gradient-to-br from-[#0a0a0f] via-[#0f0f17] to-[#0a0a0f]" : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9]",
    container: isDark ? "bg-white/[0.03] border-white/10 backdrop-blur-3xl" : "bg-white/60 border-white/40 backdrop-blur-3xl shadow-xl",
    textMain: isDark ? "text-white" : "text-slate-900",
    textMuted: isDark ? "text-zinc-400" : "text-slate-500",
    input: "w-full bg-transparent border-b py-3 text-md font-light outline-none transition-all duration-500 focus:scale-[1.01]",
    inputBorder: isDark ? "border-white/10 focus:border-indigo-500/80" : "border-slate-300 focus:border-indigo-500",
    panel: isDark ? "bg-white/[0.02] backdrop-blur-xl" : "bg-white/50 backdrop-blur-xl",
    button: "bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/20"
  };

  return (
    <div className={`min-h-screen ${theme.canvas} transition-all duration-700 flex items-center justify-center p-6 relative overflow-hidden`}>
      {/* Visual background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-25 right-25 w-150 h-150 rounded-full blur-[160px] opacity-20 ${isDark ? "bg-indigo-600" : "bg-indigo-300"}`} />
        <div className={`absolute bottom-30 left-30 w-125 h-125 rounded-full blur-[140px] opacity-10 ${isDark ? "bg-violet-500" : "bg-pink-200"}`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-6xl ${theme.container} border rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row z-10 overflow-hidden`}
      >
        {/* Left Section: Branding */}
        <div className={`w-full lg:w-[40%] p-12 lg:p-20 flex flex-col justify-center border-r border-white/10 ${theme.panel}`}>
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center mb-8 border border-indigo-500/20">
            <FaCut className="text-indigo-500 text-3xl -rotate-45" />
          </div>
          <h1 className={`text-6xl font-black tracking-tighter ${theme.textMain} leading-[0.85]`}>
            Rate Your<br />
            <span className="font-extralight italic opacity-30">Couture</span>
          </h1>
          <div className="h-1 w-12 bg-indigo-600 mt-12 rounded-full" />
          <p className={`mt-10 text-sm font-medium leading-relaxed ${theme.textMuted} max-w-xs`}>
            Share your feedback directly with the studio. No account required.
          </p>
        </div>

        {/* Right Section: Form */}
        <div className="w-full lg:w-[60%] p-10 lg:p-20 relative">
          <div className="absolute top-8 right-8">
            <button onClick={() => setIsDark(!isDark)} className="p-3 rounded-full border border-white/10 hover:bg-white/5 transition">
              {isDark ? <FaSun className="text-amber-400" /> : <FaMoon className="text-slate-600" />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-10">
              {/* Contact Input */}
              <div className="relative group">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-2 block`}>Tailor Contact</label>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-0 top-4 opacity-20 text-indigo-500" />
                  <input 
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="ENTER 10 DIGIT NUMBER"
                    className={`${theme.input} ${theme.inputBorder} ${theme.textMain} pl-8`}
                  />
                  <AnimatePresence>
                    {form.errors.contact && (
                      <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="absolute left-0 -bottom-5 text-[10px] text-rose-500 font-bold italic">
                        {form.errors.contact}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Star Selection */}
              <div className="relative">
                <label className={`text-[9px] font-black uppercase tracking-[0.4em] ${theme.textMuted} mb-6 block text-center`}>Expertise Rating</label>
                <div className={`flex justify-between items-center px-8 py-6 rounded-3xl border ${isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"}`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => handleRating(star)}
                      className="transition-transform active:scale-75"
                    >
                      <FaStar 
                        size={32}
                        className={`transition-all duration-300 ${star <= (hover || form.rating) ? "text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]" : "text-white/10"}`}
                      />
                    </button>
                  ))}
                </div>
                {form.errors.rating && <p className="text-center mt-4 text-[10px] text-rose-500 font-bold italic">{form.errors.rating}</p>}
              </div>

              {/* Experience Text */}
              <div className="relative">
                <label className={`text-[9px] font-black uppercase tracking-[0.3em] ${theme.textMuted} mb-2 block`}>Your Experience</label>
                <textarea 
                  name="reviewText"
                  value={form.reviewText}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the fit, finish, and service..."
                  className={`${theme.input} ${theme.inputBorder} ${theme.textMain} resize-none`}
                />
                <div className="absolute right-0 -bottom-6">
                   <span className={`text-[10px] font-mono ${form.reviewText.length >= maxChars ? "text-rose-500" : "text-zinc-500"}`}>
                     {form.reviewText.length}/{maxChars}
                   </span>
                </div>
                {form.errors.reviewText && <p className="absolute left-0 -bottom-6 text-[10px] text-rose-500 font-bold italic">{form.errors.reviewText}</p>}
              </div>
            </div>

            <div className="pt-6">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className={`w-full py-6 rounded-2xl text-white font-bold text-[11px] uppercase tracking-[0.5em] flex items-center justify-center gap-4 transition-all ${theme.button}`}
              >
                <FaPaperPlane className="text-xs" />
                Publish Review
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}