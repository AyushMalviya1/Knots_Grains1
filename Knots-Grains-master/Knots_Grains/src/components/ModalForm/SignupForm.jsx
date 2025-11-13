import { useState } from "react";
import { useModalNavigation } from "./index";
import { useDispatch } from "react-redux";
import { login } from "../../store/Authslice";
import authService from "../../AuthService/AuthService";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const { closeModal, openLogin } = useModalNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Frontend password length validation
    if (password.length < 6 || password.length > 12) {
      setError("Password should be between 6 and 12 characters long.");
      return;
    }

    try {
      const isValidEmail = await authService.checkEmail(email);

      if (isValidEmail) {
        dispatch(login({ name, email, contact: Contact, password }));
        navigate("/aadhaaverifying");
      } else {
        setError("Email already in use. Please use a different email.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div>
          <h2 className="text-2xl font-semibold text-center mb-6 text-yellow-600">
            Create Your Carpenter Profile
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <input
              type="text"
              inputMode="numeric"
              placeholder="Contact Number"
              value={Contact}
              required
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) setContact(value);
              }}
              maxLength="10"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <input
              type="password"
              placeholder="Password (6–12 characters)"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            {/* ✅ Show error message */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              onClick={openLogin}
              className="text-yellow-500 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
