import { BrainCircuit, Mail, Lock, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../Api/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setShowOtp(true);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/verify-otp", null, {
        params: {
          email,
          otp,
        },
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

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

        {!showOtp ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>

            <p className="text-gray-500 mb-8">
              Sign up to get started
            </p>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <form
              className="space-y-5"
              onSubmit={handleRegister}
            >

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Name
                </label>

                <div className="flex items-center border rounded-xl mt-2 px-4 py-3">
                  <User
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="ml-3 w-full outline-none"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>

                <div className="flex items-center border rounded-xl mt-2 px-4 py-3">
                  <Mail
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="ml-3 w-full outline-none"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Password
                </label>

                <div className="flex items-center border rounded-xl mt-2 px-4 py-3">
                  <Lock
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="password"
                    placeholder="Enter password"
                    className="ml-3 w-full outline-none"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
              >
                {loading
                  ? "Sending OTP..."
                  : "Register"}
              </button>

              <Link
                to="/login"
                className="block w-full text-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Back to Login
              </Link>

            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verify Your Email
            </h2>

            <p className="text-gray-500 mb-8">
              Enter the OTP sent to {email}
            </p>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
                {error}
              </div>
            )}

            <form
              className="space-y-5"
              onSubmit={handleVerifyOtp}
            >

              <div>
                <label className="text-sm font-medium text-gray-600">
                  OTP
                </label>

                <div className="flex items-center border rounded-xl mt-2 px-4 py-3">
                  <Mail
                    size={18}
                    className="text-gray-400"
                  />

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    placeholder="Enter 6-digit OTP"
                    className="ml-3 w-full outline-none tracking-widest"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOtp(false);
                  setOtp("");
                  setError("");
                }}
                className="block w-full text-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Back to Registration
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default Register;