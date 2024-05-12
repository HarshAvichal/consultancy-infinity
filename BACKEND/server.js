const express = require("express");
const app = express();
const dbConnect = require("./config/db");
const cors = require("cors")
require('dotenv').config();


app.use(express.json())
app.use(cors());

// configuring cors

PORT = process.env.PORT || 3000;

const formDetails = require("./routes/contact");
app.use("/api/v1",formDetails);


app.get('/',(req,res)=>{
    res.send("This is default route");
})

app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})

dbConnect();