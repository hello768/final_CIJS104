import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/Users/quanamg/Documents/MindX ReactJs/final/src/styles/Global.css";
import { useUser } from "../contexts/UserContext";
import Navbar from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/NavBar.jsx";

export default function LoginPage() {
  const { setUser, apiKey } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=${apiKey}`
      );

      const result = await response.json();
      const users = result?.data?.data || [];

      console.log("Dữ liệu API:", users);
      console.log("Email nhập:", email, "Password nhập:", password);

      const foundUser = users.find(
        (u) =>
          u.email?.trim().toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        navigate("/main");
      } else {
        alert("Email hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Đăng nhập thất bại: Dữ liệu người dùng không hợp lệ hoặc không kết nối được đến server.");
    }
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans">
      <Navbar />
      <div className="relative background-blur page flex flex-col justify-center items-center min-h-screen bg-cover" style={{ backgroundImage: "url('/images/IMG_1826.jpg')" }}>
        <div className="relative z-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-white mt-4 mb-50 text-center">Chào mừng bạn đến với Wen Cars!</h1>
          <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-sm ">
            <h1 className="flex justify-center items-center text-xl font-semibold mb-4  text-slate-800 ">Xin chào bạn!</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="bg-gray-800 text-white p-2 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="bg-gray-800 text-white p-2 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded w-full"
              >
                Đăng nhập
              </button>
            </form>

            <p className="text-sm text-center text-black mt-4 text-slate-800">
              Chưa có tài khoản?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-500 hover:underline"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
