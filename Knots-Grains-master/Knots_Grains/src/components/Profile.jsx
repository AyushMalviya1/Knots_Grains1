import React, { useEffect, useState, useRef } from "react";
import { Mail, Phone, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../AuthService/AuthService";
import { setPostImageUrls, setSkill } from "../store/Authslice";
import UpdateProfile from "./UpdateProfile/UpdateProfile";

export default function CarpenterProfile() {
  const authStatus = useSelector((state) => state.auth.status);
  const {
    name,
    experience,
    location,
    email,
    contact: phone,
    bio,
    image,
  } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [postImageUrl, setPostImageUrl] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editSkillsMode, setEditSkillsMode] = useState(false);

  // Carpenter object
  const carpenter = {
    name,
    experience,
    location,
    email,
    phone,
    bio,
    image,
    rating: 4.8,
  };

  // Load initial skills & images
  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
      return;
    } 
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await authService.getSkills(email);
        setSkills(skills);
        dispatch(setSkill(skills));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSkills();
  },[])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = await authService.getPostImageUrls(email);
        setPostImageUrl(imageUrls);
        dispatch(setPostImageUrls(imageUrls));
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  },[setPostImageUrl]);

  const handleAddSkill =async () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      try {
        const response = await authService.uploadSkill(email, newSkill);
      } catch (error) {
        console.log("error in handleAddSkill");
      }
      setNewSkill("");
      
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
    // TODO: Update backend
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", email);

    try {
      const response = await fetch("http://localhost:2003/uploadPost", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      const imageUrls = await authService.getPostImageUrls(email);
      setPostImageUrl(imageUrls);
      dispatch(setPostImageUrls(imageUrls));
      console.log("Uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-100 py-10 px-4 flex justify-center">
      <Card className="max-w-4xl w-full shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-6 md:p-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={
                image ||
                "https://ntouchmassageandwellness.com/wp-content/uploads/2016/02/no-profile-image.jpg"
              }
              alt="Carpenter"
              className="rounded-full w-40 h-40 object-cover border-4 border-amber-400 shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-amber-800">{name}</h1>
              <p className="text-gray-700 mt-2">{bio}</p>
              <div className="flex items-center gap-2 mt-3 text-amber-700">
                <Star className="text-yellow-500" fill="currentColor" />
                <span>{carpenter.rating} / 5.0</span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-700">
            <p>
              <strong>Experience:</strong> {experience}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="text-amber-600" size={18} /> {location}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="text-amber-600" size={18} /> {email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="text-amber-600" size={18} /> {phone}
            </p>
          </div>

          {/* Specialties / Skills */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-amber-800">
                Specialties
              </h2>
              <Button
                onClick={() => setEditSkillsMode(!editSkillsMode)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm"
              >
                {editSkillsMode ? "Done" : "Edit Skills"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  {skill}
                  {editSkillsMode && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-500 font-bold ml-1"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {editSkillsMode && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Add new skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="border px-2 py-1 rounded-md flex-1"
                />
                <Button
                  onClick={handleAddSkill}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Add
                </Button>
              </div>
            )}
          </div>

          {/* Portfolio / Posts */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-amber-800">Posts</h2>
              <Button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white"
              >
                Upload Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Array.isArray(postImageUrl) &&
                postImageUrl.map((image, id) => (
                  <img
                    key={id}
                    src={image}
                    alt="Project"
                    className="rounded-xl shadow-md hover:scale-105 transition-transform"
                  />
                ))}
            </div>
          </div>
<div className="mt-6 flex justify-center">
  <Button
    onClick={() => navigate("/update-profile")}
    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md"
  >
    Update Profile
  </Button>
</div>

        </CardContent>
      </Card>
    </div>
  );
}
