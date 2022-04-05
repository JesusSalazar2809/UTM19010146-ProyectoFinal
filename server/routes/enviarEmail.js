const express = require('express');
const router = express.Router();
const Email = require('../lib/email')

router.post("/",(req, res) => {
    if(!req.body.correo || !req.body.nombre || !req.body.primerApellido 
        || !req.body.segundoApellido || !req.body.edad || !req.body.direccion){
        return res.status(400).json({ 
            ok:false,
            status:400,
            message: `Debe enviar la informacion necesario para crear un email, la cual es la siguiente:
            nombre, primerApellido, segundoApellido, edad, direccion y correo`,
        })
    }
    Email.sendEmail(req.body.correo,req.body).then(() => {
        return res.status(200).json({ 
            ok:true,
            status:200,
            message: "Correo enviado con exito"
        })
    }).catch(err => {
        return res.status(500).json({ 
            ok:false,
            status:500,
            message: "El correo no se pudo enviar",
            cont:{
                err:err.message
            }
        })
    })
})

module.exports = router;
