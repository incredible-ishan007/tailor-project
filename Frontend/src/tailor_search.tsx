import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
   FaMapMarkerAlt,  FaChevronRight, 
  FaFilter, FaCheck, FaMoon, FaSun, FaChevronLeft 
} from "react-icons/fa";

export default function FindTailor() {
  const [isDark, setIsDark] = useState(true);
  const [filters, setFilters] = useState({ cities: [], specialities: [] });
  const [sel, setSel] = useState({ city: "", category: "", speciality: "" });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = results.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(results.length / cardsPerPage);
  

  useEffect(() => {
    const init = async () => {
      const fRes = await axios.get("http://tailor-project-backend.vercel.app/tailor/get-filters");
      if (fRes.data.status) setFilters(fRes.data);
      handleSearch(); 
    };
    init();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setCurrentPage(1);
    const res = await axios.post("http://tailor-project-backend.vercel.app/tailor/search-tailors", sel);
    if (res.data.status) setResults(res.data.results);
    setLoading(false);
  };

  const theme = {
    canvas: isDark ? "bg-gradient-to-br from-[#0a0a0f] via-[#0f0f17] to-[#0a0a0f]" : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9]",
    container: isDark ? "bg-white/[0.03] border-white/10 backdrop-blur-3xl" : "bg-white/60 border-white/40 backdrop-blur-3xl shadow-xl",
    textMain: isDark ? "text-white" : "text-slate-900",
    textMuted: isDark ? "text-zinc-400" : "text-slate-500",
    input: `w-full bg-transparent border-b py-3 text-sm font-light outline-none transition-all duration-500 focus:scale-[1.02] ${isDark ? "border-white/10 focus:border-indigo-500/80" : "border-slate-300 focus:border-indigo-500"}`,
    panel: isDark ? "bg-white/[0.02] backdrop-blur-xl" : "bg-white/50 backdrop-blur-xl",
    button: "bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg active:scale-95 transition-all"
  };

  return (
    <div className={`min-h-screen ${theme.canvas} transition-all duration-700 p-8 flex flex-col lg:flex-row gap-8 relative overflow-hidden`}>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-25 right-25 w-150 h-150 rounded-full blur-[160px] opacity-10 ${isDark ? "bg-indigo-600" : "bg-indigo-300"}`} />
      </div>

      <div className="absolute top-8 right-8 z-30">
        <button onClick={() => setIsDark(!isDark)} className="px-5 py-2 rounded-full border border-white/20 backdrop-blur-md transition">
          {isDark ? <FaMoon className="text-white" /> : <FaSun className="text-amber-500" />}
        </button>
      </div>

      <aside className={`w-full lg:w-96 ${theme.container} border rounded-[2.5rem] p-10 h-fit sticky top-8 z-10`}>
        <h2 className={`text-3xl font-black mb-10 flex items-center gap-3 ${theme.textMain}`}>
          <FaFilter className="text-indigo-500 text-xl" /> Filters
        </h2>

        <div className="space-y-10">
          <div className="relative group">
            <label className={`text-[10px] uppercase font-black ${theme.textMuted} block mb-1`}>Location</label>
            <select 
              value={sel.city} 
              onChange={e => setSel({...sel, city: e.target.value})}
              className={`${theme.input} ${theme.textMain} appearance-none cursor-pointer pr-10 uppercase`}
            >
              <option value="" className={isDark ? "bg-[#0f0f17]" : "bg-white"}>All Cities</option>
              {filters.cities.map(c => (
                <option  value={c} className={isDark ? "bg-[#0f0f17]" : "bg-white"}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label className={`text-[10px] uppercase font-black ${theme.textMuted}`}>Category</label>
            <div className="flex flex-wrap gap-2">
              {["", "Men", "Women", "Children"].map(cat => (
                <button 
                  type="button" 
                  onClick={() => setSel({...sel, category: cat})} 
                  className={`px-4 py-2 rounded-full border text-[10px] font-bold transition-all ${sel.category === cat ? "bg-indigo-600 border-indigo-500 text-white shadow-lg" : `${isDark ? "border-white/10 text-white/40" : "border-slate-300 text-slate-500"}`}`}
                >
                  {cat === "" ? "ALL" : cat.toUpperCase()} {sel.category === cat && <FaCheck className="inline ml-1 text-[8px]" />}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group">
            <label className={`text-[10px] uppercase font-black ${theme.textMuted} block mb-1`}>Dress Type</label>
            <select 
              value={sel.speciality} 
              onChange={e => setSel({...sel, speciality: e.target.value})}
              className={`${theme.input} ${theme.textMain} appearance-none cursor-pointer pr-10 uppercase`}
            >
              <option value="" className={isDark ? "bg-[#0f0f17]" : "bg-white"}>Any Speciality</option>
              {filters.specialities.map(s => (
                <option key={s} value={s} className={isDark ? "bg-[#0f0f17]" : "bg-white"}>{s}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleSearch} 
            className={`w-full py-5 rounded-2xl text-white font-bold uppercase tracking-widest text-xs ${theme.button}`}
          >
            {loading ? "Synchronizing Results..." : "Apply Filters"}
          </button>
        </div>
      </aside>

      <main className="flex-1 z-10 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            
            {currentCards.map((t: any) => (
              <motion.div 
                layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                key={t.emailid} className={`${theme.container} border p-5 rounded-4xl group hover:border-indigo-500/50 transition-all duration-500`}
              >
                <div className="relative aspect-[1.3/1] rounded-2xl bg-black/40 mb-5 overflow-hidden">
                  <img src={`http://tailor-project-backend.vercel.app/uploads/${t.profilepic}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-indigo-400">
                    {t.worktype || "Master"}
                  </div>
                </div>

                <div className="px-2">
                  <h3 className={`text-xl font-black tracking-tight ${theme.textMain} truncate`}>{t.name}</h3>
                  <div className={`flex items-center gap-2 ${theme.textMuted} text-[10px] font-bold mt-1 mb-4 uppercase tracking-wider`}>
                    <FaMapMarkerAlt className="text-indigo-500" /> {t.city}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {t.speciality.split(',').slice(0, 2).map((s: string) => (
                      <span key={s} className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[9px] font-black rounded border border-indigo-500/20 uppercase tracking-tighter">{s.trim()}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 py-10 border-t border-white/5 flex flex-col items-center gap-4">
           <span className={`text-[10px] font-black tracking-[0.4em] uppercase ${theme.textMuted} opacity-40`}>
             Page {currentPage} of {totalPages || 1}
           </span>
           <div className="flex items-center gap-6">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className={`p-2 transition ${currentPage === 1 ? "opacity-10 cursor-not-allowed" : "text-indigo-500 hover:scale-125"}`}
              >
                <FaChevronLeft />
              </button>

              <div className="flex gap-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button 
                    key={i + 1} 
                    onClick={() => setCurrentPage(i + 1)}
                    className={`text-xs font-black transition ${currentPage === i + 1 ? "text-indigo-500 scale-150" : "text-zinc-700 hover:text-white"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className={`p-2 transition ${currentPage === totalPages ? "opacity-10 cursor-not-allowed" : "text-indigo-500 hover:scale-125"}`}
              >
                <FaChevronRight />
              </button>
           </div>
        </div>
      </main>
    </div>
  );
}