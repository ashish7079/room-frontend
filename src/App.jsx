import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Register from "./Login/Register";
import Signin from "./Login/Signin";
import Buy from "./Components/Buy";
import Home from "./User/Home";

function App() {

  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>

        {/* Home sab ke liye open */}
        <Route path="/" element={<Home />} />

        {/* Dashboard only RoomOwner */}
        <Route 
          path="/dashboard" 
          element={role === "RoomOwner" ? <Dashboard /> : <Signin />} 
        />

        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Register />} />

        {/* Buy without id → redirect */}
        <Route path="/buy" element={<Navigate to="/" />} />

        {/* Buy with id */}
        <Route path="/buy/:id" element={<Buy />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;