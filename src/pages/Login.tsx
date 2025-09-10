import React, { useState, useEffect } from "react";
import { User, Lock, Eye, EyeOff, Stethoscope, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!username || !password || !role) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple demo authentication logic
      if (username === "admin" && password === "admin123" && role === "admin") {
        login(username, "admin");
        navigate("/");
      } else if (
        username === "doctor" &&
        password === "doctor123" &&
        role === "doctor"
      ) {
        login(username, "doctor");
        navigate("/");
      } else if (
        username === "nurse" &&
        password === "nurse123" &&
        role === "nurse"
      ) {
        login(username, "nurse");
        navigate("/");
      } else if (
        username === "registrar" &&
        password === "registrar123" &&
        role === "registrar"
      ) {
        login(username, "registrar");
        navigate("/");
      } else {
        setError("Invalid username, password, or role");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Blue Section */}
      <div
        className="flex-1 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-8 relative bg-cover bg-center"
        style={{ backgroundImage: "url(/login-background.jpg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 opacity-80"></div>
        <div className="text-center text-white max-w-md relative z-10">
          {/* Stethoscope Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Stethoscope className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">Advanced Patient Care</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Streamlining healthcare management for better patient outcomes and
            efficient hospital operations.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                Karapitiya Hospital
              </h2>
            </div>
            <p className="text-gray-600">Patient Record Management</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center mb-2">
                <Lock className="w-6 h-6 text-gray-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">
                  Secure Login
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Access your medical records and hospital services
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              {/* Role Selection */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Role
                </label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select your role</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="registrar">Registrar</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username or Employee ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="pb-8">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Sign In to PRMS
                  </>
                )}
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Demo Credentials */}
            {/*<div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 font-medium mb-2">
                Demo Credentials:
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>Admin: admin / admin123</div>
                <div>Doctor: doctor / doctor123</div>
                <div>Nurse: nurse / nurse123</div>
              </div>
            </div>*/}
          </div>

          {/* View Sidebar Button */}
          {/*<div className="mt-6 text-center">
            <button className="text-gray-500 hover:text-gray-700 text-sm px-4 py-2 border border-gray-300 rounded-lg transition-colors">
              View sidebar
            </button>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default Login;
