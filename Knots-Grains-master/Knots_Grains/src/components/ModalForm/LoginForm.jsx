import React from "react";
import { useModalNavigation } from "./index";
import { useDispatch } from "react-redux";
import { login } from "../../store/Authslice";
import authService from "../../AuthService/AuthService";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { closeModal, openSignup } = useModalNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carpenter = { email, password };

    try {
      const data = await authService.login(carpenter);

      if (data.message === "successful") {
        const imageBase64 = data.image; 

        const image = imageBase64
          ? `data:image/jpeg;base64,${imageBase64}`
          : "https://ntouchmassageandwellness.com/wp-content/uploads/2016/02/no-profile-image.jpg";

          data.carpenter.image = image;
        dispatch(login(data.carpenter));
        navigate("/profile");
      } else {
        alert(data.error || "Invalid credentials!");
      }
    } catch (data) {
      setError(data.message);
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
            Login to Your Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <button
              onClick={openSignup}
              className="text-yellow-500 hover:underline font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
