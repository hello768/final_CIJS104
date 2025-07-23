import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import "/Users/quanamg/Documents/MindX ReactJs/final/src/styles/Global.css";
import { useUser } from "../contexts/UserContext";
import Navbar from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/NavBar.jsx";


export default function RegisterPage() {
  const { apiKey } = useUser();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const resCheck = await fetch(
        `https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=68502847f6ab77144f4f5783`
      );
      const result = await resCheck.json();
      const users = result?.data?.data || [];

      const isEmailTaken = users.some((user) => user.email === email);
      if (isEmailTaken) {
        alert("Email đã được sử dụng. Vui lòng dùng email khác.");
        return;
      }

      const newUser = {
        fullName,
        email,
        password,
      };

      const res = await fetch(
        `https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=68502847f6ab77144f4f5783`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const text = await res.text();
      console.log("Server response:", text);

      if (!res.ok) {
        throw new Error(text || `Lỗi: ${res.status}`);
      }

      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      alert("Đăng ký thất bại: " + error.message);
    }
  };



  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans">
      <Navbar />
      <div className="relative background-blur page flex flex-col justify-center items-center min-h-screen bg-cover" style={{ backgroundImage: "url('/images/IMG_1826.jpg')" }}>
        <div className="relative z-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-white mt-4 mb-35 text-center">Chào mừng bạn đến với Wen Cars!</h1>
          <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-sm">
            <h1 className="flex justify-center items-center text-xl font-semibold mb-4 text-slate-800">Xin chào!</h1>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded w-full"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded w-full"
              >
                Đăng ký
              </button>
            </form>

            <p className="text-sm text-center text-slate-800 mt-4">
              Đã có tài khoản?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:underline"
              >
                Đăng nhập
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
