

const UserHome = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- MAIN FEATURE COMPONENT --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Large Editorial Card */}
          <div className="lg:col-span-8 p-12 rounded-[3.5rem] bg-gradient-to-br from-indigo-600/20 to-violet-900/10 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-8">
                The Artisan’s Journal
              </p>
              <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase mb-8">
                THE SILENT <br /> ARCHITECTURE <br /> 
                <span className="text-white/10">OF WEAVE.</span>
              </h1>
              <p className="max-w-md text-sm font-bold text-zinc-400 leading-relaxed italic">
                "A master tailor interprets the character of the cloth to create a silhouette that stands outside of time."
              </p>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/5 blur-[100px] rounded-full" />
          </div>

          {/* Small Insight Card */}
          <div className="lg:col-span-4 p-10 rounded-[3.5rem] bg-white/[0.03] border border-white/10 flex flex-col justify-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6">Technical Study</h3>
            <div className="space-y-4">
              <h4 className="text-xl font-black italic uppercase text-white">The Natural Drape</h4>
              <p className="text-xs font-bold text-zinc-500 leading-relaxed">
                Exploring the tension of high-twist yarns. The way a fabric recovers its shape is the true test of quality and longevity in bespoke garments.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECONDARY CONTENT GRID --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Philosophy Card */}
          <div className="lg:col-span-5 p-10 rounded-[3.5rem] bg-[#0d0d14] border border-white/5 space-y-6 hover:border-white/20 transition-colors duration-500">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">The Philosophy</h4>
             <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">The Canvas <br /> Integrity.</h2>
             <p className="text-xs font-bold text-zinc-500 leading-loose">
               Unlike mass-produced garments, a bespoke piece relies on a floating canvas. It breathes, it molds to your frame, and it grows with you over time.
             </p>
          </div>

          {/* Heritage Card */}
          <div className="lg:col-span-7 p-10 rounded-[3.5rem] bg-white/[0.01] border border-white/5 flex flex-col justify-center">
            <div className="max-w-md space-y-4">
              <h3 className="text-2xl font-black italic uppercase text-white tracking-tight">Generational Craft</h3>
              <p className="text-sm font-bold text-zinc-500 leading-relaxed">
                From the heavy shears of the past to the precise needlework of the modern era, we celebrate the tools that have remained unchanged for centuries.
              </p>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">
                
              </p>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};

export default UserHome;