import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../AuthService/AuthService";
import { useDispatch } from "react-redux";
import { login } from "../../store/Authslice";

export default function UpdateProfile() {
  const carpenter = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    experience: "",
    contact: "",
    location: "",
    imageFile: null,
    imagePreview: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!status) navigate("/login");
  }, [status]);

  useEffect(() => {
    if (carpenter) {
      setFormData((prev) => ({
        ...prev,
        name: carpenter.name || "",
        bio: carpenter.bio || "",
        experience: carpenter.experience || "",
        contact: carpenter.contact || "",
        location: carpenter.location || "",
        imagePreview: carpenter.image || "",
      }));
    }
  }, [carpenter]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", carpenter.email);
    data.append("name", formData.name);
    data.append("bio", formData.bio);
    data.append("experience", formData.experience);
    data.append("contact", formData.contact);
    data.append("location", formData.location);
    if (formData.imageFile) data.append("imageFile", formData.imageFile);

    try {
      const result = await authService.updateProfile(data);
      alert("Profile updated successfully!");
      const imageBase64 = result.imageBase64;
      const image = imageBase64
        ? `data:image/jpeg;base64,${imageBase64}`
        : "https://ntouchmassageandwellness.com/wp-content/uploads/2016/02/no-profile-image.jpg";
      result.carpenter.image = image;
      dispatch(login(result.carpenter));
      navigate("/profile");
      console.log(result);
    } catch (err) {
      alert("Failed to update profile!");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-yellow-700 mb-6">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <img
                src={
                  formData.imagePreview ||
                  "https://ntouchmassageandwellness.com/wp-content/uploads/2016/02/no-profile-image.jpg"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-2 border-yellow-400"
              />
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            placeholder="Bio"
            className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience in years"
            className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact number"
            maxLength={10}
            className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
