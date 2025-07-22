// import React, { useContext, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import { assets } from '../assets/assets_frontend/assets'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// const MyProfile = () => {

//   const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

//   const [isEdit, setIsEdit] = useState(false)
//   const [image, setImage] = useState(false)

//   const updateUserProfileData = async () => {

//     try {

//       const formData = new FormData()

//       formData.append('name', userData.name)
//       formData.append('phone', userData.phone)
//       formData.append('address', JSON.stringify(userData.address))
//       formData.append('gender', userData.gender)
//       formData.append('dob', userData.dob)

//       image && formData.append('image', image)

//       const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

//       if (data.success) {
//         toast.success(data.message)
//         await loadUserProfileData()
//         setIsEdit(false)
//         setImage(false)
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }

//   }

//   return userData && (
//     <div className='max-w-lg flex flex-col gap-2 text-sm'>

//       {
//         isEdit
//           ? <label htmlFor="image">
//             <div className='inline-block relative cursor-pointer'>
//               <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
//               <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
//             </div>
//             <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
//           </label>
//           : <img className='w-36 rounded' src={userData.image} alt="" />
//       }

//       {
//         isEdit
//           ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
//           : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
//       }

//       <hr className='bg-zinc-400 h-[1px] border-none' />

//       <div>
//         <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>

//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className='font-medium'>Email id:</p>
//           <p className='text-blue-500'>{userData.email}</p>

//           <p className='font-medium'>Phone:</p>
//           {
//             isEdit
//               ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
//               : <p className='text-blue-500'>{userData.phone}</p>
//           }

//           <p className='font-medium'>Address:</p>
//           <div>
//             {
//               isEdit
//                 ?
//                 <p>
//                   <input className='bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
//                   <br />
//                   <input className='bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
//                 </p>
//                 :
//                 <p className='text-gray-400'>
//                   {userData.address.line1}
//                   <br />
//                   {userData.address.line2}
//                 </p>
//             }
//           </div>
//         </div>
//       </div>

//       <div>
//         <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>

//         <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//           <p className='font-medium'>Gender:</p>
//           {
//             isEdit
//               ?
//               <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//               :
//               <p className='text-gray-400'>{userData.gender}</p>
//           }

//           <p className='font-medium'>Birthday:</p>
//           {
//             isEdit
//               ? <input className='max-w-28 bg-gray-100' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
//               : <p className='text-gray-400'>{userData.dob}</p>
//           }
//         </div>
//       </div>

//       <div className='mt-10'>
//         {
//           isEdit
//             ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={() => updateUserProfileData()}>Save Information</button>
//             : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={() => setIsEdit(true)}>Edit</button>
//         }
//       </div>

//     </div>
//   )
// }

// export default MyProfile

import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import { toast } from "react-toastify";
import axios from "axios";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  // Error states
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dobError, setDobError] = useState("");

  // Name validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z ]*$/.test(value)) {
      setUserData((prev) => ({ ...prev, name: value }));
      if (value.length < 2) {
        setNameError("Name must be at least 2 characters long");
      } else {
        setNameError("");
      }
    } else {
      setNameError("Name must contain only letters and spaces");
    }
  };

  // Phone validation
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setUserData((prev) => ({ ...prev, phone: value }));
      if (value.length < 10) {
        setPhoneError("Phone number must be 10 digits");
      } else if (value.length > 10) {
        setPhoneError("Phone number cannot exceed 10 digits");
      } else {
        setPhoneError("");
      }
    } else {
      setPhoneError("Phone number must contain only digits");
    }
  };

  // Address validation
  const handleAddressChange = (e, line) => {
    const value = e.target.value;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [line]: value,
      },
    }));

    if (!value.trim()) {
      setAddressError(
        `${line === "line1" ? "Address Line 1" : "Address Line 2"} is required`
      );
    } else {
      setAddressError("");
    }
  };

  // Gender validation
  const handleGenderChange = (e) => {
    const value = e.target.value;
    setUserData((prev) => ({ ...prev, gender: value }));
    if (!value) {
      setGenderError("Please select a gender");
    } else {
      setGenderError("");
    }
  };

  // DOB validation
  const handleDobChange = (e) => {
    const value = e.target.value;
    setUserData((prev) => ({ ...prev, dob: value }));

    if (!value) {
      setDobError("Date of birth is required");
    } else {
      const today = new Date();
      const dob = new Date(value);
      const age = today.getFullYear() - dob.getFullYear();

      if (age < 0) {
        setDobError("Date of birth cannot be in the future");
      } else if (age > 120) {
        setDobError("Please enter a valid date of birth");
      } else {
        setDobError("");
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!userData.name || nameError) {
      setNameError("Please enter a valid name");
      isValid = false;
    }

    if (!userData.phone || phoneError) {
      setPhoneError("Please enter a valid phone number");
      isValid = false;
    }

    if (!userData.address.line1 || !userData.address.line2) {
      setAddressError("Please fill in both address lines");
      isValid = false;
    }

    if (!userData.gender || userData.gender === "Not Selected") {
      setGenderError("Please select a gender");
      isValid = false;
    }

    if (!userData.dob || dobError) {
      setDobError("Please enter a valid date of birth");
      isValid = false;
    }

    return isValid;
  };

  const updateUserProfileData = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <div>
            <input
              className={`bg-gray-50 text-3xl font-medium max-w-60 mt-4 border ${
                nameError ? "border-red-500" : "border-transparent"
              }`}
              type="text"
              value={userData.name}
              onChange={handleNameChange}
            />
            {nameError && (
              <span className="text-red-500 text-xs">{nameError}</span>
            )}
          </div>
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>

          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <div>
                <input
                  className={`bg-gray-100 max-w-52 border ${
                    phoneError ? "border-red-500" : "border-transparent"
                  }`}
                  type="text"
                  value={userData.phone}
                  onChange={handlePhoneChange}
                />
                {phoneError && (
                  <span className="text-red-500 text-xs">{phoneError}</span>
                )}
              </div>
            ) : (
              <p className="text-blue-500">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            <div>
              {isEdit ? (
                <div>
                  <input
                    className={`bg-gray-100 border ${
                      addressError ? "border-red-500" : "border-transparent"
                    }`}
                    onChange={(e) => handleAddressChange(e, "line1")}
                    value={userData.address.line1}
                    type="text"
                    placeholder="Address Line 1"
                  />
                  <br />
                  <input
                    className={`bg-gray-100 border ${
                      addressError ? "border-red-500" : "border-transparent"
                    }`}
                    onChange={(e) => handleAddressChange(e, "line2")}
                    value={userData.address.line2}
                    type="text"
                    placeholder="Address Line 2"
                  />
                  {addressError && (
                    <span className="text-red-500 text-xs">{addressError}</span>
                  )}
                </div>
              ) : (
                <p className="text-gray-400">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>

          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <div>
                <select
                  className={`max-w-20 bg-gray-100 border ${
                    genderError ? "border-red-500" : "border-transparent"
                  }`}
                  onChange={handleGenderChange}
                  value={userData.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {genderError && (
                  <span className="text-red-500 text-xs">{genderError}</span>
                )}
              </div>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <div>
                <input
                  className={`max-w-28 bg-gray-100 border ${
                    dobError ? "border-red-500" : "border-transparent"
                  }`}
                  type="date"
                  onChange={handleDobChange}
                  value={userData.dob}
                />
                {dobError && (
                  <span className="text-red-500 text-xs">{dobError}</span>
                )}
              </div>
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
