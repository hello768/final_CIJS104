import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaRobot } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Navbar() {
  const [currentTime, setCurrentTime] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAskGemini = async () => {
    setShowPopup(true);
    setLoading(true);
    setAiMessage("");

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyBHzGkUsZrVaWwLx5jTO9ixnyKA8bPBTns");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Gợi ý mua xe hơi chung chung gọn, nói một chút về an toàn của xe";

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      console.log(text);
      setAiMessage(text);
    } catch (error) {
      console.error("Gemini Error:", error);
      setAiMessage("❌ Không thể lấy kết quả từ AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="w-full bg-[#0f172a] text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link to="/main" className="text-xl font-bold tracking-wider">
            <span className="text-blue-400">Wen</span>Cars
          </Link>
          <div className="text-sm font-mono text-gray-300 ml-4">{currentTime}</div>
        </div>

        <ul className="flex space-x-6 text-sm font-medium items-center mt-2 md:mt-0">
          <li>
            <Link to="/account" className="hover:text-blue-400">
              <div className="flex items-center gap-1">
                <FaUser size={14} /> Tài khoản
              </div>
            </Link>
          </li>
          <li><Link to="/register" className="hover:text-blue-400">Đăng ký</Link></li>
          <li><Link to="/upload-cars" className="hover:text-blue-400">Nhờ bán xe hộ</Link></li>
          <li><Link to="/support" className="hover:text-blue-400">Hỗ trợ</Link></li>
          <li><Link to="/orders" className="hover:text-blue-400">Lịch sử đơn hàng</Link></li>
          <li>
            <button
              onClick={handleAskGemini}
              className="text-green-400 hover:text-green-300 text-xl"
              title="Hỏi AI (Gemini)"
            >
              <FaRobot />
            </button>
          </li>
        </ul>
      </nav>

      {showPopup && (
        <div className="fixed inset-0 background-blur  bg-opacity-70 flex justify-center items-center z-50" style={{ backgroundImage: "url('/images/IMG_1826.jpg')" }}>
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              Gemini - Gợi ý mua xe
            </h2>
            {loading ? (
              <p className="text-blue-500 text-center">⏳ Đang xử lý...</p>
            ) : (
              <p className="whitespace-pre-wrap text-sm text-gray-800">{aiMessage}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
