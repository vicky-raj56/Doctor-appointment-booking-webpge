// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const Login = () => {

//   const { backendUrl, token, setToken } = useContext(AppContext)
//   const navigate = useNavigate()
//   const [state, setState] = useState('Sign Up')
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()

//     try {

//       if (state === 'Sign up') {
//         const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
//         if (data.success) {
//           localStorage.setItem('token', data.token)
//           setToken(data.token)
//         } else {
//           toast.error(data.message)
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
//         if (data.success) {
//           localStorage.setItem('token', data.token)
//           setToken(data.token)
//         } else {
//           toast.error(data.message)
//         }
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       navigate('/')
//     }
//   }, [token])

//   return (
//     <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
//       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
//         <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
//         <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>

//         {
//           state === 'Sign Up' && (
//             <div className='w-full'>
//               <p>Full Name</p>
//               <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
//             </div>
//           )
//         }

//         <div className='w-full'>
//           <p>Email</p>
//           <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
//         </div>

//         <div className='w-full'>
//           <p>Password</p>
//           <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
//         </div>

//         <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>

//         {
//           state === 'Sign Up'
//             ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
//             : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
//         }
//       </div>
//     </form>
//   )
// }

// export default Login

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Name validation - only letters and spaces
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z ]*$/.test(value)) {
      setName(value);
      setNameError("");
    } else {
      setNameError("Name must contain only letters and spaces");
    }
  };

  // Email validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Password validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!/[a-z]/.test(value)) {
      setPasswordError("Password must contain at least one lowercase letter");
    } else if (!/[0-9]/.test(value)) {
      setPasswordError("Password must contain at least one number");
    } else {
      setPasswordError("");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Final validation before submit
    if (state === "Sign Up") {
      if (nameError || emailError || passwordError) {
        toast.error("Please fix the errors before submitting");
        return;
      }
      if (!/^[A-Za-z ]+$/.test(name)) {
        setNameError("Name must contain only letters and spaces");
        toast.error("Please enter a valid name");
        return;
      }
    }

    if (emailError || passwordError) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={handleNameChange}
              value={name}
              placeholder="Enter your full name"
              required
            />
            {nameError && (
              <span className="text-red-500 text-xs">{nameError}</span>
            )}
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={handleEmailChange}
            value={email}
            placeholder="Enter your email"
            required
          />
          {emailError && (
            <span className="text-red-500 text-xs">{emailError}</span>
          )}
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="Enter your password"
            required
          />
          {passwordError && (
            <span className="text-red-500 text-xs">{passwordError}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
