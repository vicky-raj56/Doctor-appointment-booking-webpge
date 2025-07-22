import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ---------- Left Section ---------- */}
        <div>
          {/* <img className='mb-5 w-40' src={assets.logo} alt="" /> */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center shadow-md  bg-blue-100 w-[170px]"
          >
            <img
              className="w-[40px] cursor-pointer "
              src={assets.logo2}
              alt=""
            />
            <p className="text-blue-500 text-2xl cursor-pointer">HealthCare</p>
          </div>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* ---------- Center Section ---------- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ---------- Right Section ---------- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-212-456-7890</li>
            <li>vickyraj@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ---------- Copyright Text ---------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
