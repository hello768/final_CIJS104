// src/components/ErrorBoundary.jsx
import React from "react";
import "/Users/quanamg/Documents/MindX ReactJs/final/src/styles/Global.css";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center  bg-[#0f172a]">
          <div className=" p-8 rounded-2xl shadow-lg max-w-md w-full text-center bg-white">
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Có lỗi xảy ra!
            </h1>
            <p className="text-gray-700 mb-4">
              Rất tiếc, đã xảy ra sự cố khi tải trang. Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
            >
              Thử lại
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
