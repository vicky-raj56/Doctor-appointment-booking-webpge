import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const Doctorappointments = () => {

  const {dToken,appointments,getAppointments,completeAppointment,cancelAppointment }= useContext(DoctorContext)

  const {calculateAge,slotDateFormat,currency} = useContext(AppContext)

 useEffect(()=>{
  if(dToken){
    getAppointments()
  }},[dToken])
  
  return (
   <div className='w-full max-w-6xl m-5 '>
    <p className='mb-3 text-lg font-medium'>All Appointments</p>

    <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
      <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      
      {
        appointments.map((item,index)=>(
          <div className='flex flex-wrap justify-between max-sm:gap-5 max:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 px-6 border-b hover:bg-gray-200  ' key={index}>
            {/* {console.log(item.userData.name)} */}
            <p className='max:sm:hidden'>{index+1}</p>
            <div className='flex item-c gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>          
            </div>

            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full '>
                {item.payment ? 'Online': 'CASH'}
              </p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
              <p>{currency} {item.amount}</p>
              {
                item.cancelled 
                ? <p>cancelled</p> 
                : item.isCompleted
                ?<p>completed</p>
                :  <div className='flex'>
                <img onClick={()=>{cancelAppointment(item._id)}} src={assets.cancel_icon} alt="" />
                <img onClick={()=>{completeAppointment(item._id)}} src={assets.tick_icon} alt="" />
              </div>
              }

             
          </div>

        ))
      }

    </div>

   </div>
  )
}

export default Doctorappointments