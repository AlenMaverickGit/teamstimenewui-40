// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchClientToken } from "../../src/services/tokenservice";

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const token = await fetchClientToken(employeeId, password);

    if (token) {
      // Optionally store token in localStorage/session
      localStorage.setItem("access_token", token);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5D2EFF] via-[#6B2BEB] to-[#814BFE] flex flex-col items-center justify-center px-4 py-8">
      {/* Welcome Message */}
      <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg">
        Welcome to <span className="text-yellow-300">TeamsTime</span>
      </h1>

      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 transition-transform transform hover:scale-[1.01]">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600 font-medium">
            Please login to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              placeholder="EMP202301"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Powered by{" "}
          <span className="text-indigo-600 font-semibold">TeamsTime</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
