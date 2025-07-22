import mongoose from "mongoose";

// const connectDB = async () => {
//   mongoose.connection.on('connected', () => console.log('Database Connected'))
//   await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
// }
const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb is connected")
  }catch(error){
    console.log("Mongodb is disconnected")
  }
}

export default connectDB