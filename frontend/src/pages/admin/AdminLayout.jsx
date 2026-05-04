import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-6">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

        <ul className="space-y-4">
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/scores">Scores</Link></li>
          <li><Link to="/admin/draw">Draw</Link></li>
          <li><Link to="/admin/charities">Charities</Link></li>
          <li><Link to="/admin/winners">Winners</Link></li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;