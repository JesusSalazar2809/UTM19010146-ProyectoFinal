const express = require('express');
const {json, urlencoded} = require('express');
const app = express();
require("./config/config");
require("colors");
const mongoose = require("mongoose");

mongoose.connect(process.env.URL_DB, () => {
    console.log("Connected to DB");
});
app.use(json({limit: '50mb'}));
app.use(urlencoded({limit: '50mb', extended: true }));

app.use("/api",require('./routes/index.js'));

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"App is successfully"
    });
});
app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});