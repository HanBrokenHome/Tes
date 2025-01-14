import mongoose from "mongoose";

const connetDB = async() => {
    try{
      mongoose.connect('mongodb://locahost:27017/mern-auth')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));
        console.log(`MongoDb Connected: ${connect.connection.host}`)
    }
    catch(error){
        console.error(error)
        process.exit(1);
    }
}

export default connetDB;