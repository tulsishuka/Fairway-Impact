import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const UserLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/user" },
    { name: "Score Entry", path: "/user/scores" },
    { name: "Charities", path:"/user/charities" },
     { name: "Winner", path:"/user/winner" },
  ];

  return (
    <div className="min-h-screen bg-[#0d110e] text-[#e4e7e5] flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#131915] border-r border-[#1f2923] p-6 hidden lg:flex flex-col">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
                ${
                  location.pathname === item.path
                    ? "bg-[#22c55e]/20 text-emerald-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    location.pathname === item.path
                      ? "bg-emerald-400"
                      : "bg-gray-500"
                  }`}
                />
                {item.name}
              </button>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;