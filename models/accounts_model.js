import mongoose from "mongoose";


const AccountSchema = new mongoose.Schema({
    account_type: {
        type: String, required: true
    },
    sub_type: {
        type: String, required: true
    },
    account_name: {
        type: String, required: true
    },
    created_by: {
        type: String, required: true
    },
    created_at: {
        type: Date,  default: Date.now
    }

});

const Account = new mongoose.model("Account", AccountSchema);

export default Account;