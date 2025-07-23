// src/pages/customer/AccountPage.jsx
import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/NavBar.jsx";

export default function AccountPage() {
  const { user, setUser, apiKey } = useUser();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!user) {
      alert("Bạn chưa đăng nhập!");
      navigate("/login");
      return;
    }

    setFullName(user.fullName || "");
    setEmail(user.email || "");
    setPassword(user.password || "");
  }, [user, navigate]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `https://mindx-mockup-server.vercel.app/api/resources/users/${user._id}?apiKey=${apiKey}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, email, password }),
        }
      );

      if (!response.ok) throw new Error("Cập nhật thất bại!");

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Cập nhật thành công!");
    } catch (error) {
      alert("Lỗi khi cập nhật: " + error.message);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Bạn chắc chắn muốn xoá tài khoản?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://mindx-mockup-server.vercel.app/api/resources/users/${user._id}?apiKey=${apiKey}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Xoá tài khoản thất bại!");

      localStorage.removeItem("user");
      setUser(null);
      alert("Tài khoản đã xoá thành công!");
      navigate("/register");
    } catch (error) {
      alert("Lỗi khi xoá tài khoản: " + error.message);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans">
      <Navbar />
      <div className="relative background-blur page flex flex-col justify-center items-centermin-h-[300px] bg-no-repeat bg-center bg-[length:100%_auto]" style={{ backgroundImage: "url('/images/IMG_0049.jpg')" }}>
        <div className="relative z-10 flex flex-col justify-center items-center">
          <div className="p-4 w-fit bg-white bg-opacity-95 shadow-md rounded-xl mt-4 mb-50">
            <h1 className="text-2xl font-bold text-center text-slate-800 whitespace-nowrap">
              Thông tin tài khoản cá nhân
            </h1>
          </div>
          <div className="p-6 max-w-md mx-auto bg-white shadow rounded-xl">
            <h2 className="flex justify-center items-center  text-2xl font-bold mb-4 text-slate-800">Cập nhật thông tin</h2>
            <input
              type="text"
              placeholder="Họ tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 mb-3 bg-gray-200 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-3 bg-gray-200 rounded"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-3 bg-gray-200 rounded"
            />
            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
              >
                Cập nhật
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
              >
                Xoá tài khoản
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                  navigate("/login");
                }}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
