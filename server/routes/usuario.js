const express = require('express');
const router = express.Router();
const UsuarioModel = require('../models/usuario');
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req,res) =>{
    try{
        const usuario = await UsuarioModel.create(req.body).catch(err =>{
            return res.status(500).json({
                response:"Usuario no creado",
                error:err.message
            })
        });
        return res.status(200).json({
            response:"usuario creado",
            data:usuario
        })
    }catch(err){
        return res.status(500).json({
            response:"Usuario no creado",
            error:err.message
        })
    }
});

router.get("/", async (req,res) =>{
    try{
        const usuarios = await UsuarioModel.find().populate('puesto');
        return res.status(200).json({
            response:usuarios.length > 0 ? "Registro encontrados" : "No hay registros",
            data: usuarios
        })
    }catch(err){
        return res.status(500).json({
            response:"Hubo un error al tratar de obtener a los usuarios",
            error: err.message
        })
    }
});

router.get("/:id", async (req,res) =>{
    try{
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                response:"No se pudo obtener el usuario",
                error:"ID invalido o inexistente"
            })
        }
        const usuario = await UsuarioModel.findOne({_id:req.params.id}).populate('puesto');
        return res.status(200).json({
            response:usuario ? "Registro encontrado" : "Registro no encontrado",
            data: usuario
        })
    }catch(err){
        return res.status(500).json({
            response:"Hubo un error al tratar de obtener al usuario",
            error: err.message
        })
    }
});

router.put("/:id", async(req,res) =>{
    try{
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                response:"Usuario no actualizado",
                error:"Se necesita el id para actualizar al usuario."
            })
        }
        await UsuarioModel.findByIdAndUpdate({_id:req.params.id},{
            $set:req.body
        }).catch(err =>{
            return res.status(500).json({
                response:"Usuario no actualizado",
                error:err.message
            })
        });
        const usuario = await UsuarioModel.findOne({_id:req.params.id}).populate('puesto');
        return res.status(200).json({
            response:"Usuario actualizado",
            data:usuario
        })
    }catch(err){
        return res.status(500).json({
            response:"Usuario no actualizado",
            error:err.message
        })
    }
});

router.delete("/:id", async(req,res) =>{
    try{
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                response:"Usuario no eliminado",
                error:"ID invalido o inexistente"
            })
        }
        await UsuarioModel.findOneAndRemove({_id:req.params.id}).catch(err =>{
            return res.status(500).json({
                response:"Usuario no eliminado",
                error:err.message
            })
        });
        return res.status(200).json({
            response:"usuario eliminado"
        })
    }catch(err){
        return res.status(500).json({
            response:"Usuario no eliminado",
            error:err.message
        })
    }
});

module.exports = router;
