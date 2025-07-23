import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/NavBar.jsx";
import { useUser } from "/Users/quanamg/Documents/MindX ReactJs/final/src/contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const API_URL = "https://mindx-mockup-server.vercel.app/api/resources/orders";
const API_KEY = "68502847f6ab77144f4f5783";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const isAdmin = user?.email === "nhimhanhphuc1542@gmail.com";

  useEffect(() => {
    if (!user) {
      alert("Bạn cần đăng nhập để xem đơn hàng!");
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}?apiKey=${API_KEY}`);
      const data = res.data?.data?.data || [];

      const filteredOrders = isAdmin
        ? data
        : data.filter((order) => order.userEmail === user?.email);

      setOrders(filteredOrders);
    } catch (error) {
      alert("Lỗi khi tải đơn hàng");
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn huỷ đơn hàng này?")) return;

    try {
      await axios.delete(`${API_URL}/${orderId}?apiKey=${API_KEY}`);
      fetchOrders();
    } catch (error) {
      alert("Lỗi khi huỷ đơn hàng");
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email]);

  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          {isAdmin ? "Tất cả đơn hàng" : "Lịch sử đơn hàng của bạn"}
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">Không có đơn hàng nào.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#1e293b] rounded-xl p-4 shadow-lg"
              >
                <img
                  src={order.image}
                  alt={`${order.brand} ${order.model}`}
                  className="w-full h-40 object-cover rounded"
                />
                <div className="mt-3">
                  <p className="text-sm text-blue-400">{order.brand}</p>
                  <h3 className="font-semibold text-lg">{order.model}</h3>
                  <p className="text-blue-400 font-bold">
                    {Number(order.price).toLocaleString("vi-VN")} VND
                  </p>

                  <p className="text-sm text-blue-400">
                    Gọi để trao đổi: {order.phone}
                  </p>
                  <p className="text-sm text-blue-400">
                    Tài khoản đặt: {order.userEmail}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    Ngày đặt:{" "}
                    {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                  </p>
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
                  >
                    Huỷ đơn hàng
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
