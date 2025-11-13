class AuthService {
  signup = async (carpenter) => {
    try {
      const response = await fetch("http://localhost:2003/addCarpenter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carpenter),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      console.log("Success:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error; // throw so caller can catch
    }
  };

  login = async (carpenter) => {
    try {
      const response = await fetch("http://localhost:2003/checkCarpenter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carpenter),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend exception
        throw new Error(data.error || "Login failed");
      }

      return data;
    } catch (error) {
      console.error("Something went wrong. Please try again later.");
      throw error;
    }
  };

  checkEmail = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:2003/checkEmail?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Error checking email:", response.statusText);
        throw new Error("Network response was not ok");
      }

      const isAvailable = await response.json();

      return isAvailable;
    } catch (error) {
      console.error("Error checking email:", error);
      throw error;
    }
  };

  verifyAadhaar = async (aadhaar) => {
    try {
      const response = await fetch(
        `http://localhost:2003/checkAadhar?aadharNumber=${encodeURIComponent(
          aadhaar
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const isAuthorized = await response.json();
      return isAuthorized;
    } catch (error) {
      console.error("Error verifying Aadhaar:", error);
      throw error;
    }
  };

  updateProfile = async (formData) => {
    try {
      const response = await fetch("http://localhost:2003/updateCarpenter", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.status);
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);
      return data;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  getPostImageUrls = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:2003/getImageUrls?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch image URLs");

      const imageUrls = await response.json();
      return imageUrls;
    } catch (error) {
      console.error("Error fetching image URLs:", error);
      throw error;
    }
  };
  getSkills = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:2003/getSkills?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch skills");

      const skills = await response.json();
      return skills;
    } catch (error) {
      console.error("Error fetching skills", error);
      throw error;
    }
  };

  uploadSkill = async (email, skill) => {
    try{
    const response = await fetch(
      `http://localhost:2003/setSkills?email=${encodeURIComponent(
        email
      )}&skill=${encodeURIComponent(skill)}`,
       {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
    );
    if(!response.ok){
      console.log("error in uploading skills ")
    }
    return this.getSkills(email);
  }catch(error){
    console.log(error);
  }   
  };
}

const authService = new AuthService();
export default authService;
