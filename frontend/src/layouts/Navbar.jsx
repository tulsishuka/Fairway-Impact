
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#0a0e54] px-4 py-3 md:px-10 sticky top-0 z-50 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0a0e54] font-black text-xl italic">
            D
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            igital Heroes
          </div>
        </Link>

       

        {/* AUTH BUTTONS */}
        <div className="flex items-center space-x-3">
          <Link 
            to="/login" 
            className="px-5 py-2 text-sm font-bold text-white border border-blue-800 rounded-md hover:bg-blue-900/50 transition"
          >
            Login
          </Link>
          <Link 
            to="/Charity" 
            className="px-5 py-2 text-sm font-bold text-white bg-[#1a45c4] rounded-md hover:bg-blue-600 transition shadow-md"
          >
            Charity
          </Link>
        </div>
      </div>

      {/* MOBILE SEARCH - Updated to match dark theme */}
      <div className="mt-3 relative md:hidden">
        <input
          type="text"
          placeholder="Search charities..."
          className="w-full rounded-lg bg-[#161b6e] border border-blue-900 py-2 pl-4 pr-10 text-white placeholder-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-300" />
      </div>

    </nav>
  );
};

export default Navbar;