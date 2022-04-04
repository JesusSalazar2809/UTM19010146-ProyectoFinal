const {Schema, model} = require("mongoose");

const usuarioSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, "Es necesario enviar el nombre"]
    },
    strPrimerApellido: {
        type: String,
        required: [true, "Es necesario enviar el primer apellido"]
    },
    strSegundoApellido: {
        type: String,
        required: [true, "Es necesario enviar el segundo apellido"]
    },
    nmbEdad: {
        type: Number,
        required: [true, "Es necesario enviar la edad"]
    },
    idPuesto:{ 
        type: Schema.Types.ObjectId, 
        ref: "puesto", 
        required: [true, "Es necesario enviar id del puesto"]
    },
    credenciales: {
        strCorreo:  {
            type: String,
            required: [true, "Es necesario enviar el correo"]
        },
        
        stsPassword:  {
            type: String,
            required: [true, "Es necesario enviar el password"]
        },
    }
});

module.exports = model("usuario", usuarioSchema);