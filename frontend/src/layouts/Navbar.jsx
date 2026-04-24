import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 py-4 md:px-10 sticky top-0 z-50">
      
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

        {/* LOGO */}
        <Link to="/">
          <div className="text-2xl font-bold text-slate-900">
            Digital Heroes
          </div>
        </Link>

        {/* SEARCH (Desktop only) */}
        <div className="relative hidden flex-1 max-w-md md:block">
          <input
            type="text"
            placeholder="Search charities, draws..."
            className="w-full rounded-xl border border-gray-200 py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>

        {/* LINKS */}
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">

          <Link to="/" className="hover:text-black transition">
            Home
          </Link>

          <Link to="/charities" className="hover:text-black transition">
            Charities
          </Link>

       

          <Link to="/login" className="hover:text-black transition">
            Login
          </Link>

          {/* CTA BUTTON */}
          <Link
            to="/Subscription"
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Subscribe
          </Link>

          {/* CART / ICON (optional future feature) */}
          <Link to="/cart" className="hidden md:block">
            <ShoppingCart className="h-5 w-5 hover:text-black transition" />
          </Link>

        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="mt-4 relative md:hidden">
        <input
          type="text"
          placeholder="Search charities..."
          className="w-full rounded-xl border border-gray-200 py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-black/10"
        />
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>

    </nav>
  );
};

export default Navbar;