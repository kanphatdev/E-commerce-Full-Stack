import { Outlet } from "react-router-dom";
import Adminheader from "../components/admin/Adminheader";
import Adminsidebar from "../components/admin/Adminsidebar";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <Adminsidebar />
      <div className="flex-1 flex flex-col">
        <Adminheader />
        <main className="flex-1 p-6 overflow-y-auto bg-base-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
