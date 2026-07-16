import { BrainCircuit, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../Api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post("/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google login failed.");
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed.");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl text-white">
              <BrainCircuit size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                AI Business Opportunity
              </h1>

              <p className="text-gray-500 text-sm">
                Discovery Agent
              </p>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Sign in to continue
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4 py-3">
                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="ml-3 w-full outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4 py-3">
                <Lock size={18} className="text-gray-400" />

                <input
                  type="password"
                  placeholder="Enter password"
                  className="ml-3 w-full outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

              <a href="#" className="text-blue-600">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-2">
              <hr className="flex-1 border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Login */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

            {/* Register */}
            <Link
              to="/register"
              className="block w-full text-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Register
            </Link>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white items-center justify-center p-12">
        <div className="max-w-lg">
          <h2 className="text-5xl font-bold mb-6">
            AI Business Opportunity Discovery
          </h2>

          <p className="text-lg opacity-90 leading-8">
            Discover startup opportunities using AI-powered market research,
            competitor analysis, customer pain points, news trends, and
            intelligent business recommendations—all in one dashboard.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-4xl font-bold">12K+</h3>
              <p>Companies Analyzed</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-4xl font-bold">250+</h3>
              <p>Competitors Tracked</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-4xl font-bold">80K+</h3>
              <p>Customer Reviews</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-4xl font-bold">AI</h3>
              <p>Opportunity Generator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;