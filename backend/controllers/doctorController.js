import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"
const changeAvailablity = async (req, res) => {

  try {

    const { docId } = req.body
    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
    res.json({ success: true, message: 'Availablity Changed ' })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}

const doctorList = async (req, res) => {

  try {

    const doctors = await doctorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, doctors })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }

}


// API for doctor Login
// yaha se
const loginDcotor = async (req,res)=>{
  try {
    const {email,password}=req.body
    const doctor = await doctorModel.findOne({email})
    if(!doctor){
      return res.json({success:false,message:"Invalid crendicial"})
    }
    // console.log(doctor)
    const  isMatch= await bcrypt.compare(password,doctor.password);
    // console.log(isMatch)
    if(isMatch){
      const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }else{
      return res.json({success:false,message:"Invalid crendicial"})

    }
    
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}  


// API to get doctor appointments for doctor panel
const appointmentsDoctor = async(req,res)=>{
  try {  
    const {docId} = req.body
    const appointments = await appointmentModel.find({docId})

    res.json({success:true,appointments})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API mark to completed
const appointmentComplete = async(req,res)=>{
  try {
    const {docId,appointmentId}=req.body
    const appointmentData =await appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
      return res.json({success:true,message:"Appointment Completed"})
    }else{
      return res.json({success:false,message:"Mark failed"})
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API acnacel appoinbrmnet
const appointmentCancel = async(req,res)=>{
  try {
    const {docId,appointmentId}=req.body
    const appointmentData =await appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId === docId){
      await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
      return res.json({success:true,message:"Appointment Canecelled"})
    }else{
      return res.json({success:false,message:"cancilation failed"})
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
// yaha tak likha hu


export { changeAvailablity, doctorList,loginDcotor,appointmentsDoctor,appointmentCancel,appointmentComplete }