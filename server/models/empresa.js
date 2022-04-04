const {Schema, model} = require("mongoose");

const empresaSchema = new Schema({
    strNombre:{
        type: String,
        required: [true, "Es necesario enviar el nombre"]
    },
    strRazonSocial:{ 
        type: String, 
        required: [true, "Es necesario enviar la razon social"]
    },
});

module.exports = model("empresa", empresaSchema);