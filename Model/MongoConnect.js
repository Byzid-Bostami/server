require('dotenv').config();
const mongoose = require('mongoose');

const mongoConnect = async()=>{
    try {
        const Url = process.env.MONGODB_CONNECT_URL;
        await  mongoose.connect(Url);
        console.log("mongo is connected succesfully");
   
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {mongoConnect};