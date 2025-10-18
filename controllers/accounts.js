import express from 'express';
import Account from '../models/accounts_model.js';
import Admin from '../models/admin-model.js';

export const createAccount = async (req, res) => {
    try {
        const account = req.body;

        const username = account.user;
        const findUser = await Admin.findOne({ username: username });
        const seedAccount = {
            account_type: account.account_type,
            sub_type: account.sub_account_type,
            account_name: account.account_name,
            created_by: account.created_by,
        }
        if (findUser) {
            console.log("USER FOUND", findUser);
            const newAccount = new Account(seedAccount);
            await newAccount.save();
            return res.status(200).json({message: "ACCOUNT CREATED SUCCESSFULLY"})
        };

    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}


export const getAccounts = async (req,res) =>{
     try {
    const accounts = await Account.find();
    const account_count = await Account.countDocuments();
    res.status(200).json({ accounts, account_count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}