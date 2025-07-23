import React from "react";
import Navbar from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/NavBar.jsx";
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

export default function SupportPage() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans">
      <Navbar />

      <div className="relative h-[400px] bg-cover bg-center flex flex-col justify-center items-start px-10"
        style={{ backgroundImage: "url('/images/IMG_0049.jpg')" }}>
        <h1 className="text-4xl font-bold mb-4 text-blue-900">Liên hệ & Hỗ trợ</h1>
        <p className="text-lg text-blue-900">Chúng tôi luôn sẵn sàng hỗ trợ bạn!</p>
      </div>

      <div className="px-10 py-10 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-red-500" size={20} />
          <p>Email: <span className="text-blue-300">nhimhanhphuc1542@gmail.com</span></p>
        </div>

        <div className="flex items-center gap-4">
          <FaPhone className="text-green-400" size={20} />
          <p>Điện thoại: <span className="text-blue-300">0908598989</span></p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/share/191un9uvha/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-300"
          >
            <FaFacebook size={28} />
          </a>
          <p>Facebook: <span className="text-blue-300">Bee Nguyễn</span></p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/_nhimlun_?igsh=MWkycDA0eWxrbWwzcQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-300"
          >
            <FaInstagram size={28} />
          </a>
          <p>Instagram: <span className="text-blue-300">@NHIMLUN</span></p>
        </div>
      </div>
    </div>
  );
}
