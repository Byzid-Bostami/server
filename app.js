const express = require("express");
const app = express();
const cors = require('cors');
const router = require('./Routes/ControllAllRoutes');

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.use(router);


app.use((req,res)=>{
    res.status(404).send("<h1>page not found</h1>");
});




module.exports = app;