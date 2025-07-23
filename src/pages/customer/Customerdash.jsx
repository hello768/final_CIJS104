import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/NavBar.jsx";
import { useUser } from "/Users/quanamg/Documents/MindX ReactJs/final/src/contexts/UserContext.jsx";
import CarDetailModel from "../../components/CarDetailModel.jsx";
import axios from "axios";

export default function HomePage() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const apiKey = "68502847f6ab77144f4f5783";

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          `https://mindx-mockup-server.vercel.app/api/resources/cars?apiKey=${apiKey}`
        );
        const result = await response.json();
        setCars(result?.data?.data || []);
      } catch (error) {
        console.error("Lỗi khi tải danh sách xe:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://mindx-mockup-server.vercel.app/api/resources/orders?apiKey=${apiKey}`
        );
        const allOrders = res.data?.data?.data || [];
        setOrders(allOrders);
      } catch (error) {
        console.error("Lỗi khi tải đơn hàng:", error);
      }
    };

    fetchCars();
    fetchOrders();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBuy = async (car) => {
    if (!user) {
      alert("Vui lòng đăng nhập để mua xe!");
      navigate("/login");
      return;
    }

    const newOrder = {
      image: car.image,
      brand: car.brand,
      model: car.model,
      price: car.price,
      phone: car.phone || "Chưa cung cấp",
      userEmail: user.email,
      orderDate: new Date().toISOString(),
    };

    try {
      await axios.post(
        `https://mindx-mockup-server.vercel.app/api/resources/orders?apiKey=${apiKey}`,
        newOrder
      );
      alert("Đặt xe thành công!");
      navigate("/orders");
    } catch (error) {
      console.error("Lỗi khi đặt xe:", error);
      alert("Lỗi khi đặt xe, vui lòng thử lại.");
    }
  };


  const isCarOrdered = (imageUrl) => {
    return orders.some((order) => order.image === imageUrl);
  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen font-sans">
      <Navbar />

      <div
        className="relative h-[400px] bg-cover bg-center flex flex-col justify-center items-start px-10"
        style={{ backgroundImage: "url('/images/IMG_0049.jpg')" }}
      >
        <h1 className="text-4xl font-bold mb-4 text-blue-900">Chiếc xe của bạn?</h1>
        <input
          type="text"
          placeholder="Tìm theo hãng xe (ví dụ: Honda, Toyota...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl px-4 py-2 rounded bg-white text-black shadow-md"
        />
      </div>

      <div className="px-10 py-10">
        <h2 className="text-xl font-bold mb-4">Các xe đã qua sử dụng</h2>
        <button className="text-gray-400 mb-4">Những xe hiện tại đang có</button>

        {filteredCars.length === 0 ? (
          <p className="text-gray-400">Không tìm thấy xe phù hợp.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-[#1e293b] rounded-xl p-4 shadow-lg cursor-pointer"
                onClick={() => setSelectedCar(car)}
              >
                <div className="relative">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full rounded-md h-55 object-cover"
                  />
                </div>

                <div className="mt-3">
                  <p className="text-sm text-blue-400">{car.brand}</p>
                  <h3 className="font-semibold text-lg">{car.model}</h3>
                  <p className="text-blue-400 font-bold">
                    {Number(car.price).toLocaleString("vi-VN")} VND
                  </p>

                  <div className="text-sm text-gray-300 mt-1 space-y-1">
                    <p>{car.location || "Địa điểm không xác định"}</p>
                    <p>
                      {car.year} · {car.drive || "FWD"}
                    </p>
                    <p>
                      {car.fuel} · {car.seats} chỗ
                    </p>
                    <p>{car.mileage} KM</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuy(car);
                    }}
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
                  >
                    Mua xe
                  </button>
                  {isCarOrdered(car.image) && (
                    <div className="w-full text-center mt-3 py-1 rounded-md bg-green-600 text-white text-sm font-bold">
                      Đã đặt
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCar && (
        <CarDetailModel car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}