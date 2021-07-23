const mongoose = require("mongoose")

//2-require dotenv
require('dotenv').config(({path: "./.env"}))


   const connectDB = async () => {
   
     try {
    const connec = await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,       
        useCreateIndex: true,
      }
    );
    console.log('Successfully connected');
  } catch (error) {
    console.log("An error has occured while trying to connect");
  }
};

module.exports = connectDB;