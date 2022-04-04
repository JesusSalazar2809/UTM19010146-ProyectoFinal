const {Schema, model} = require("mongoose");

const puestoSchema = new Schema({
    strNombre:{
        type: String,
        required: [true, "Es necesario enviar el nombre"]
    },
    idEmpresa:{ 
        type: Schema.Types.ObjectId, 
        ref: "empresa", 
        required: [true, "Es necesario enviar el id de la empresa"]
    },
});

module.exports = model("puesto", puestoSchema);