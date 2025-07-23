import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useUser } from "/Users/quanamg/Documents/MindX ReactJs/final/src/contexts/UserContext.jsx";
import Navbar from "/Users/quanamg/Documents/MindX ReactJs/final/src/components/NavBar.jsx";

const API_URL = 'https://mindx-mockup-server.vercel.app/api/resources/cars';
const API_KEY = '68502847f6ab77144f4f5783';
const CLOUD_NAME = 'dlcyahi9p';
const UPLOAD_PRESET = 'my_unsigned_preset';

export default function CarUploadPage() {
    const navigate = useNavigate();
    const { user } = useUser();

    const isAdmin = user?.email === "nhimhanhphuc1542@gmail.com";

    useEffect(() => {
        if (!user) {
            alert("Vui lòng đăng nhập để sử dụng tính năng này!");
            navigate("/login");
        }
    }, [user, navigate]);

    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        image: '',
        brand: '',
        model: '',
        year: '',
        price: '',
        description: '',
        location: '',
        drive: '',
        fuel: '',
        seats: '',
        engine: '',
        horsepower: '',
        torque: '',
        mileage: '',
        phone: '',
    });

    const fieldLabels = {
        brand: 'Hãng xe',
        model: 'Dòng xe',
        year: 'Năm sản xuất',
        price: 'Giá (VND)',
        description: 'Mô tả',
        location: 'Địa điểm',
        drive: 'Loại dẫn động',
        fuel: 'Nhiên liệu',
        seats: 'Số chỗ ngồi',
        engine: 'Động cơ',
        horsepower: 'Mã lực',
        torque: 'Mômen xoắn',
        mileage: 'Số km đã đi',
        phone: 'Số điện thoại liên hệ',
    };

    const fetchCars = async () => {
        try {
            const res = await axios.get(`${API_URL}?apiKey=${API_KEY}`);
            setCars(res.data?.data?.data || []);
        } catch (error) {
            alert('Lỗi khi tải danh sách xe.');
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ['price', 'year', 'seats', 'horsepower', 'torque', 'mileage'].includes(name) ? Number(value) : value,
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: data,
            });
            const result = await res.json();
            setFormData((prev) => ({
                ...prev,
                image: result.secure_url,
            }));
        } catch (error) {
            console.error('Lỗi khi upload ảnh:', error);
            alert('Không thể upload ảnh.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };
            if (!payload.image) {
                alert('Vui lòng chọn ảnh để upload.');
                return;
            }
            await axios.post(`${API_URL}?apiKey=${API_KEY}`, payload);
            setFormData({
                image: '', brand: '', model: '', year: '', price: '', description: '',
                location: '', drive: '', fuel: '', seats: '', engine: '', horsepower: '', torque: '',
                mileage: '', phone: ''
            });
            fetchCars();
        } catch (error) {
            alert('Lỗi khi thêm xe.');
        }
    };

    const handleDelete = async (carId) => {
        try {
            await axios.delete(`${API_URL}/${carId}?apiKey=${API_KEY}`);
            fetchCars();
        } catch (error) {
            alert('Lỗi khi xoá xe.');
        }
    };

    return (
        <div className="bg-[#0f172a] text-white min-h-screen font-sans">
            <Navbar />
            <div className="w-full p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Hãy để chúng tôi bán xe giúp bạn!</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="col-span-2 p-2 border rounded"
                    />

                    {formData.image && (
                        <>
                            <img src={formData.image} alt="Xem trước" className="w-40 h-40 object-cover col-span-2" />
                            <p className="text-sm text-blue-700 col-span-2 break-words">{formData.image}</p>
                        </>
                    )}

                    {Object.entries(fieldLabels).map(([field, label]) => (
                        <input
                            key={field}
                            name={field}
                            placeholder={label}
                            value={formData[field]}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        />
                    ))}

                    <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">
                        Thêm xe
                    </button>
                </form>

                <h2 className="text-xl font-semibold mb-4">Các xe đang sẵn hàng</h2>
                <div className="grid grid-cols-3 gap-4">
                    {cars.map((car) => (
                        <div key={car._id} className="border rounded-xl p-4 shadow-md bg-white">
                            <img src={car.image} alt={car.model} className="w-full h-40 object-cover rounded" />
                            <p className="text-gray-500 text-sm mt-2">{car.year}</p>
                            <p className="text-gray-500 text-sm mt-2">{car.brand} {car.model}</p>
                            <p className="text-lg font-semibold text-blue-700">
                                {Number(car.price || 0).toLocaleString('vi-VN')} VND
                            </p>
                            <p className="text-gray-700 text-sm">{car.mileage} KM</p>

                            {isAdmin && (
                                <button
                                    onClick={() => handleDelete(car._id)}
                                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Xoá
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
