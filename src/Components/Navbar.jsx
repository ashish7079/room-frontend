import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");

  };

  return (
    <div className="flex justify-between items-center px-10 h-[60px] bg-gray-900 text-white">
      
      <div onClick={() => navigate("/")} className="cursor-pointer">
        Home
      </div>

      <div className="flex gap-4">
        {role === "RoomOwner" && (
          <button onClick={() => navigate("/dashboard")} className="bg-green-500 px-4 py-1">
            Dashboard
          </button>
        )
          
        }
        {token ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-1">
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/register")}className="bg-blue-500 px-4 py-1">
            Login/Register
          </button>
        )}
      </div>
      

    </div>
  );
}

export default Navbar;