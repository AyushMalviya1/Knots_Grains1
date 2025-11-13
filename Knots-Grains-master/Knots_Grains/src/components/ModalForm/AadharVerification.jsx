import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../AuthService/AuthService";

const AadharVerification = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const carpenterData = {
    name: useSelector((state) => state.auth.name),
    contact: useSelector((state) => state.auth.contact),
    password: useSelector((state) => state.auth.password),
    email: useSelector((state) => state.auth.email),
    aadharNumber: aadhaar,
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    
    if (!consent) {
      setLoading(false);
      setError("You must provide consent before verification.");
      return;
    }

    if (aadhaar.length !== 12 || isNaN(aadhaar)) {
      setLoading(false);
      setError("Invalid Aadhaar number! Must be exactly 12 digits.");
      return;
    }

    try {
      const isAuthorized = await authService.verifyAadhaar(aadhaar);
      if (!isAuthorized) {
        setLoading(false);
        setError("Aadhaar verification failed. You are not authorized to register.");
        return;
      } else {
        console.log("Aadhaar verified successfully.");
        const data = await authService.signup(carpenterData);
        setLoading(false);
        if (data.message === "Carpenter added successfully!") {
          navigate("/profile");
        } else {
          setError("Signup failed. Please try again.");
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleAadhaarChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 12) {
      setAadhaar(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-yellow-600 mb-4">
          New Carpenter Verification
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your Aadhaar number to verify if you are authorized to register.
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter 12-digit Aadhaar Number"
            value={aadhaar}
            onChange={handleAadhaarChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-yellow-500 outline-none"
            maxLength="12"
          />

          <label className="flex items-start mb-4 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 mr-2 accent-yellow-500"
            />
            <span>
              I hereby give my consent for verifying my Aadhaar number for
              identity validation. My Aadhaar number will not be stored or
              shared without my permission.
            </span>
          </label>

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AadharVerification;
