const express = require('express');
const router = express.Router();
const EmpresaModel = require('../models/empresa');
const ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req,res) =>{
    try{
        const empresa = await EmpresaModel.create(req.body).catch(err =>{
            return res.status(500).json({
                response:"Empresa no creada",
                error:err.message
            })
        });
        return res.status(200).json({
            response:"empresa creada",
            data:empresa
        })
    }catch(err){
        return res.status(500).json({
            response:"Empresa no creada",
            error:err.message
        })
    }
});

router.get("/", async (req,res) =>{
    try{
        const empresas = await EmpresaModel.find()
        return res.status(200).json({
            response:empresas.length > 0 ? "Registro encontrados" : "No hay registros",
            data: empresas
        })
    }catch(err){
        return res.status(500).json({
            response:"Hubo un error al tratar de obtener las empresas",
            error: err.message
        })
    }
});

router.get("/:id", async (req,res) =>{
    try{
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                response:"No se pudo obtener la empresa",
                error:"ID invalido o inexistente"
            })
        }
        const empresa = await EmpresaModel.findOne({_id:req.params.id});
        return res.status(200).json({
            response:empresa ? "Registro encontrado" : "Registro no encontrado",
            data: empresa
        })
    }catch(err){
        return res.status(500).json({
            response:"Hubo un error al tratar de obtener la empresa",
            error: err.message
        })
    }
});

router.put("/:id", async(req,res) =>{
    try{
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                response:"Empresa no actualizada",
                error:"Se necesita el id para actualizar la empresa."
            })
        }
        await EmpresaModel.findByIdAndUpdate({_id:req.params.id},{
            $set:req.body
        }).catch(err =>{
            return res.status(500).json({
                response:"Empresa no actualizada",
                error:err.message
            })
        });
        const empresa = await EmpresaModel.findOne({_id:req.params.id});
        return res.status(200).json({
            response:"Empresa actualizada",
            data:empresa
        })
    }catch(err){
        return res.status(500).json({
            response:"Empresa no actualizada",
            error:err.message
        })
    }
});

router.delete("/:id", async(req,res) =>{
    try{
        if(!req.params.id || !ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                response:"Empresa no eliminada",
                error:"ID invalido o inexistente"
            })
        }
        await EmpresaModel.findOneAndRemove({_id:req.params.id}).catch(err =>{
            return res.status(500).json({
                response:"Empresa no eliminada",
                error:err.message
            })
        });
        return res.status(200).json({
            response:"empresa eliminada"
        })
    }catch(err){
        return res.status(500).json({
            response:"Empresa no eliminada",
            error:err.message
        })
    }
});

module.exports = router;
