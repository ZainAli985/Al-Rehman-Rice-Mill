import Admin from "../models/admin-model.js";
import express from "express";

 export const registeradmin = async (req, res) => {
  try {
    const { username: username, password: password } = req.body;

    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(200).json({ message: "NEW ADMIN REGISTERED", newAdmin });
  } catch (err) {
    res.status(500).json({ message: `ERROR IN REGISTERING ADMIN${err}` });
  }
};

