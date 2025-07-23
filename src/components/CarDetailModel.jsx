// components/CarDetailModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CarDetailModel({ car, onClose }) {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    const isLoggedIn = localStorage.getItem('user');

    if (isLoggedIn) {
      navigate('/orders', { state: { car } });
    } else {
      alert('Bạn cần đăng nhập để mua xe.');
      navigate('/login');
    }
  };

  return (
    <div className="fixed inset-0 z-50 background-blur flex items-center justify-center" style={{ backgroundImage: "url('/images/IMG_1826.jpg')" }}>
      <div className="bg-white dark:bg-slate-800 text-white p-6 rounded-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2">{car.title}</h2>
        <div className="relative">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className=" rounded-md h-48 w-103 object-cover"
          />
        </div>
        <p><strong>Hãng:</strong> {car.brand}</p>
        <p><strong>Dòng xe:</strong> {car.model}</p>
        <p><strong>Năm sản xuất:</strong> {car.year}</p>
        <p><strong>Giá:</strong> {Number(car.price).toLocaleString('vi-VN')} VND</p>
        <p><strong>Vị trí:</strong> {car.location}</p>
        <p><strong>Hệ dẫn động:</strong> {car.drive}</p>
        <p><strong>Nhiên liệu:</strong> {car.fuel}</p>
        <p><strong>Số chỗ:</strong> {car.seats}</p>
        <p><strong>Động cơ:</strong> {car.engine}</p>
        <p><strong>Mã lực:</strong> {car.horsepower} HP</p>
        <p><strong>Sức kéo:</strong> {car.torque} Nm</p>
        <p><strong>Số KM</strong> {car.mileage}</p>
        <p><strong>SDT liên hệ:</strong> {car.phone}</p>
        <p><strong>Mô tả:</strong> {car.description}</p>
        <button
          onClick={handleBuyClick}
          className="bg-green-600 mt-4 px-4 py-2 rounded hover:bg-green-700"
        >
          Mua xe
        </button>
      </div>
    </div>
  );
}
