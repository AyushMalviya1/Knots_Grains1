import React from "react";
import hero from "../../assets/hero.webp";
import { useModalNavigation} from "../ModalForm/index";
function Main() {


  const { openSignup } = useModalNavigation();  
  return (
    <>
      {/* ---------- Hero Section ---------- */}
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-between px-8 py-20"
      >
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-600">
            Expert Carpentry Services for Every Need
          </h2>
          <p className="text-gray-600 text-lg">
            Join our network of skilled carpenters. Create your profile,
            showcase your work, and connect with clients looking for
            professional woodwork services.
          </p>
          <button
            onClick={openSignup}
            className="bg-yellow-500 text-white px-6 py-3 rounded-md text-lg hover:bg-yellow-600 transition"
          >
            Get Started
          </button>
        </div>

        <img
          src={hero}
          alt="Carpenter at work"
          className="md:w-1/2 mt-10 md:mt-0 rounded-lg shadow-lg"
        />
      </section>
      {/* ---------- About Section ---------- */}
      <section id="about" className="px-8 py-20 bg-white text-center">
        <h3 className="text-3xl font-semibold text-yellow-600 mb-6">
          About Us
        </h3>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          CarpentryHub is a platform built for carpenters to grow their business
          online. Whether you craft furniture, handle home renovations, or
          create custom wooden pieces, our platform helps you showcase your
          skills and connect with customers directly.
        </p>
      </section>

      {/* ---------- Contact Section ---------- */}
      <section id="contact" className="px-8 py-20 bg-gray-100 text-center">
        <h3 className="text-3xl font-semibold text-yellow-600 mb-6">
          Contact Us
        </h3>
        <p className="max-w-2xl mx-auto text-gray-700 mb-8">
          Have questions or need support? Reach out to us anytime — we’re here
          to help you grow your craft.
        </p>
        <form className="max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      
    </>
  );
}

export default Main;
