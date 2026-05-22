


import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

 const navLinks = [
  { name: "Charity", path: "/UserCharity" },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/Subscription" },
];

  return (
    <nav className="w-full bg-[#000000] border-b border-zinc-800 px-6 py-4 sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between">

        {/* LEFT: BRAND */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-[#5BDDA9] tracking-wide"
        >
          Fairway Impact
        </Link>

        {/* CENTER: NAV LINKS */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-semibold tracking-wide pb-1 transition-colors duration-200 ${
                  isActive
                    ? "text-[#1cc286]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1cc286] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT: ACTION BUTTONS */}
        <div className="flex items-center space-x-6">
          <Link
            to="/login"
            className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            Login
          </Link>

          <Link
            to="/get-started"
            className="px-5 py-2 text-sm font-bold text-[#04110A] bg-[#5BDDA9] rounded-xl hover:bg-[#18aa75] transition-all duration-200 shadow-md"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;