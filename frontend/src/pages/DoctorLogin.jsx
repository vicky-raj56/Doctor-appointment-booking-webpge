import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DoctorLogin = () => {
  const { backendUrl, setDoctorToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('Login')
  
  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [image, setImage] = useState(null)

  // Error states
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [degreeError, setDegreeError] = useState('')
  const [feesError, setFeesError] = useState('')

  // Name validation
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z ]*$/.test(value)) {
      setName(value);
      if (value.length < 2) {
        setNameError('Name must be at least 2 characters long');
      } else {
        setNameError('');
      }
    } else {
      setNameError('Name must contain only letters and spaces');
    }
  };

  // Email validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Password validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError('Password must contain at least one uppercase letter');
    } else if (!/[a-z]/.test(value)) {
      setPasswordError('Password must contain at least one lowercase letter');
    } else if (!/[0-9]/.test(value)) {
      setPasswordError('Password must contain at least one number');
    } else {
      setPasswordError('');
    }
  };

  // Degree validation
  const handleDegreeChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z ]*$/.test(value)) {
      setDegree(value);
      setDegreeError('');
    } else {
      setDegreeError('Degree must contain only letters and spaces');
    }
  };

  // Fees validation
  const handleFeesChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setFees(value);
      setFeesError('');
    } else {
      setFeesError('Fees must be a number');
    }
  };

  const validateForm = () => {
    let isValid = true;
    
    if (state === 'Register') {
      if (!name || nameError) {
        setNameError('Please enter a valid name');
        isValid = false;
      }
      if (!degree || degreeError) {
        setDegreeError('Please enter a valid degree');
        isValid = false;
      }
      if (!fees || feesError) {
        setFeesError('Please enter valid fees');
        isValid = false;
      }
      if (!image) {
        toast.error('Please upload a profile picture');
        isValid = false;
      }
    }

    if (!email || emailError) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password || passwordError) {
      setPasswordError('Please enter a valid password');
      isValid = false;
    }

    return isValid;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      if (state === 'Register') {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('speciality', speciality)
        formData.append('degree', degree)
        formData.append('experience', experience)
        formData.append('fees', Number(fees))
        formData.append('about', about)
        formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
        formData.append('image', image)

        const { data } = await axios.post(backendUrl + '/api/doctor/register', formData)
        if (data.success) {
          localStorage.setItem('doctorToken', data.token)
          setDoctorToken(data.token)
          toast.success('Registration successful!')
          navigate('/doctor-dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('doctorToken', data.token)
          setDoctorToken(data.token)
          toast.success('Login successful!')
          navigate('/doctor-dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Register' ? 'Doctor Registration' : 'Doctor Login'}</p>
        <p>Please {state === 'Register' ? 'register' : 'login'} to access your account</p>

        {state === 'Register' && (
          <>
            <div className='w-full'>
              <p>Profile Picture</p>
              <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} 
                className='w-full mt-1' 
                accept="image/*"
                required 
              />
            </div>

            <div className='w-full'>
              <p>Full Name</p>
              <input 
                className={`border ${nameError ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
                type="text" 
                onChange={handleNameChange} 
                value={name} 
                placeholder="Enter your full name"
                required 
              />
              {nameError && <span className="text-red-500 text-xs">{nameError}</span>}
            </div>

            <div className='w-full'>
              <p>Speciality</p>
              <select 
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                required
              >
                <option value="General physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='w-full'>
              <p>Degree</p>
              <input 
                className={`border ${degreeError ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
                type="text" 
                onChange={handleDegreeChange} 
                value={degree} 
                placeholder="Enter your degree"
                required 
              />
              {degreeError && <span className="text-red-500 text-xs">{degreeError}</span>}
            </div>

            <div className='w-full'>
              <p>Experience</p>
              <select 
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>

            <div className='w-full'>
              <p>Fees (in $)</p>
              <input 
                className={`border ${feesError ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
                type="text" 
                onChange={handleFeesChange} 
                value={fees} 
                placeholder="Enter your consultation fees"
                required 
              />
              {feesError && <span className="text-red-500 text-xs">{feesError}</span>}
            </div>

            <div className='w-full'>
              <p>About</p>
              <textarea 
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself"
                rows="3"
                required
              />
            </div>

            <div className='w-full'>
              <p>Address</p>
              <input 
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type="text" 
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="Address Line 1"
                required 
              />
              <input 
                className='border border-zinc-300 rounded w-full p-2 mt-1'
                type="text" 
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Address Line 2"
                required 
              />
            </div>
          </>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input 
            className={`border ${emailError ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
            type="email" 
            onChange={handleEmailChange} 
            value={email} 
            placeholder="Enter your email"
            required 
          />
          {emailError && <span className="text-red-500 text-xs">{emailError}</span>}
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input 
            className={`border ${passwordError ? 'border-red-500' : 'border-zinc-300'} rounded w-full p-2 mt-1`}
            type="password" 
            onChange={handlePasswordChange} 
            value={password} 
            placeholder="Enter your password"
            required 
          />
          {passwordError && <span className="text-red-500 text-xs">{passwordError}</span>}
        </div>

        <button 
          type='submit' 
          className='bg-primary text-white w-full py-2 rounded-md text-base hover:bg-primary/90 transition-colors'
        >
          {state === 'Register' ? 'Register' : 'Login'}
        </button>

        {
          state === 'Register'
            ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p>New doctor? <span onClick={() => setState('Register')} className='text-primary underline cursor-pointer'>Register here</span></p>
        }
      </div>
    </form>
  )
}

export default DoctorLogin 