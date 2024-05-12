const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DB Connected")})
    .catch((err)=>{
        console.error(err);
        console.log("Connection Failed");
        process.exit(1);
    })
}

module.exports = dbConnect;