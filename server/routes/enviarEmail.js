const express = require('express');
const router = express.Router();
const Email = require('../lib/email')

router.post("/enviar-email",(req, res) => {
    if(!req.body.recipientMail || !req.body.name || !req.body.lastName 
        || !req.body.secondLastName || !req.body.age || !req.body.direction){
        return res.status(400).json({ 
            ok:false,
            status:400,
            message: "Debe enviar la informacion necesario para crear un email",
        })
    }
    Email.sendEmail(req.body.recipientMail,req.body).then(() => {
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
