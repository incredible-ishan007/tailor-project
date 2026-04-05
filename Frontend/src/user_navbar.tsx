import { useNavigate, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaSearch, FaStar } from "react-icons/fa";

function NavBarMain() {
  const navg = useNavigate();

  function doNavigate(url: string) {
    navg("/user/" + url); // ✅ FIXED
  }

  return (
    <>
      {/* Navbar */}
      <div className="bg-gradient-to-r from-[#0a0a0f] via-[#0f0f17] to-[#0a0a0f] border-b border-white/10 backdrop-blur-xl px-6 py-3 flex items-center gap-3">

        {/* Home */}
        <button
          onClick={() => navg("/user")} // ✅ FIXED
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-indigo-600/40 border border-white/10 text-white text-sm font-bold transition-all"
        >
          <FaHome className="text-indigo-400" />
          HOME
        </button>

        {/* Profile */}
        <button
          onClick={() => doNavigate("profile")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-indigo-600/40 border border-white/10 text-white text-sm font-bold transition-all"
        >
          <FaUser className="text-indigo-400" />
          PROFILE
        </button>

        {/* Search */}
        <button
          onClick={() => doNavigate("search")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-indigo-600/40 border border-white/10 text-white text-sm font-bold transition-all"
        >
          <FaSearch className="text-indigo-400" />
          SEARCH
        </button>

        {/* Ratings */}
        <button
          onClick={() => doNavigate("ratings")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-indigo-600/40 border border-white/10 text-white text-sm font-bold transition-all"
        >
          <FaStar className="text-indigo-400" />
          RATINGS
        </button>
      
      </div>

      {/* Page Content */}
      <Outlet />
    </>
  );
}

export default NavBarMain;