const express = require('express');
const router = express.Router();
const PuestoModel = require('../models/puesto');
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req,res) =>{
    try{
        const puesto = await PuestoModel.create(req.body).catch(err =>{
            return res.status(500).json({
                response:"Puesto no creado",
                error:err.message
            })
        });
        return res.status(200).json({
            response:"puesto creado",
            data:puesto
        })
    }catch(err){
        return res.status(500).json({
            response:"Puesto no creado",
            error:err.message
        })
    }
});

router.get("/", async (req,res) =>{
    try{
        const puestos = await PuestoModel.find().populate({
            path: 'idEmpresa',
            select:'strNombre strRazonSocial',
        });
        return res.status(200).json({
            response:puestos.length > 0 ? "Registro encontrados" : "No hay registros",
            data: puestos
        })
    }catch(err){
        return res.status(500).json({
            response:"Hubo un error al tratar de obtener los puestos",
            error: err.message
        })
    }
});

router.get("/:id", async (req,res) =>{
    try{
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                response:"No se pudo obtener el puesto",
                error:"ID invalido o inexistente"
            })
        }
        const puesto = await PuestoModel.findOne({_id:req.params.id}).populate({
            path: 'idEmpresa',
            select:'strNombre strRazonSocial',
        });
        return res.status(200).json({
            response:puesto ? "Registro encontrado" : "Registro no encontrado",
            data: puesto
        })
    }catch(err){
        return res.status(500).json({
            response:"Hubo un error al tratar de obtener al puesto",
            error: err.message
        })
    }
});

router.put("/:id", async(req,res) =>{
    try{
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                response:"Puesto no actualizado",
                error:"Se necesita el id para actualizar al puesto."
            })
        }
        await PuestoModel.findByIdAndUpdate({_id:req.params.id},{
            $set:req.body
        }).catch(err =>{
            return res.status(500).json({
                response:"Puesto no actualizado",
                error:err.message
            })
        });
        const puesto = await PuestoModel.findOne({_id:req.params.id}).populate({
            path: 'idEmpresa',
            select:'strNombre strRazonSocial',
        });
        return res.status(200).json({
            response:"Puesto actualizado",
            data:puesto
        })
    }catch(err){
        return res.status(500).json({
            response:"Puesto no actualizado",
            error:err.message
        })
    }
});

router.delete("/:id", async(req,res) =>{
    try{
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                response:"Puesto no eliminado",
                error:"ID invalido o inexistente"
            })
        }
        await PuestoModel.findOneAndRemove({_id:req.params.id}).catch(err =>{
            return res.status(500).json({
                response:"Puesto no eliminado",
                error:err.message
            })
        });
        return res.status(200).json({
            response:"puesto deleted"
        })
    }catch(err){
        return res.status(500).json({
            response:"Puesto no eliminado",
            error:err.message
        })
    }
});

module.exports = router;
