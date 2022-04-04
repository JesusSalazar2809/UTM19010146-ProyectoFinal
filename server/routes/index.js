const express = require('express');
const app = express();

app.use("/usuario",require('./usuario'));
app.use("/empresa",require('./empresa'));
app.use("/puesto",require('./puesto'));
app.use("/enviarEmail",require('./enviarEmail'));


module.exports = app;