import express from 'express'
import Admin from '../models/admin-model.js'

export const loginadmin = async (req,res) => {
    try{
        const {username,password} = req.body;

        const findAdmin = await Admin.findOne({username : username, password: password});

        if(findAdmin){
           return res.status(200).json({message: 'LOGIN SUCCESSFUL', credentials: findAdmin});
        }else{
           return res.status(404).json({message: "INVALID CREDENTIALS"});
        }
    }
    catch(err){
        res.status(500).json({message: "SERVER ERROR LOGGIN IN"});
    }
};