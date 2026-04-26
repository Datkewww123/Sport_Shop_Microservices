// src/components/ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-4">
              <i className="fas fa-exclamation-triangle text-6xl text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Đã có lỗi xảy ra
            </h1>
            <p className="text-gray-600 mb-6">
              Xin lỗi, có điều gì đó không ổn. Vui lòng thử lại sau.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left bg-gray-100 p-4 rounded-md mb-4">
                <summary className="cursor-pointer font-semibold text-sm text-gray-700 mb-2">
                  Chi tiết lỗi (Development only)
                </summary>
                <pre className="text-xs text-red-600 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              <i className="fas fa-redo mr-2" />
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
