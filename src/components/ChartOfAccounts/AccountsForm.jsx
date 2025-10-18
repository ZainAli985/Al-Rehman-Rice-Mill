import React, { useState } from "react";
import styles from "./AccountsForm.module.css";
import API_BASE_URL from "../../../config/API_BASE_URL";

const AccountsForm = () => {
    const [account_type, setaccount_type] = useState('Assets');
    const [sub_account_type, setsub_account_type] = useState('Current Assets');
    const [account_name, setaccount_name] = useState('');
    const [created_by, setcreated_by] = useState('Ali Raza');  
    const user = localStorage.getItem('user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const account = {
        account_type,
        sub_account_type,
        account_name,
        created_by,
        user
    };
    console.log(account)
    try{
        const response = await fetch(`${API_BASE_URL}/createaccount`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(account)
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);
                alert('ACCOUNT CREATED SUCCESSFULLY');
            }
            else{
                alert('SERVER ERROR CREATING THE ACCOUNT');
            }
    }catch(err){
        console.error('ERROR SENDING ACCOUNT CREATION DATA',err);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label>ACCOUNT TYPE</label>
        <select name="account_type" id="account_type" onChange={(e) => setaccount_type(e.target.value)}>
          <option value="assets">Assets</option>
          <option value="liabilities">Liabilities</option>
          <option value="equity">Equity</option>
          <option value="expense">Expense</option>
          <option value="revenue">Revenue</option>
        </select>

        <label>SUB TYPE</label>
        <select name="sub_account_type" id="sub_account_type" onChange={(e) => setsub_account_type(e.target.value)}>
          <option value="current assets">Current Assets</option>
          <option value="fixed assets">Fixed Assets</option>
          <option value="current liabilities">Current Liabilities</option>
          <option value="fixed liabilities">Fixed Liabilities</option>
          <option value="equity">Equity</option>
          <option value="expense">Expense</option>
          <option value="revenue">Revenue</option>
          <option value="contra revenue">Contra Revenue</option>
        </select>

        <input type="text" placeholder="Account Name" onChange={(e)=> setaccount_name(e.target.value)} />
        <input type="text" placeholder="Created By" onChange={(e)=> setcreated_by(e.target.value)}/>

        <button type="submit">CREATE ACCOUNT</button>
      </form>
    </div>
  );
};

export default AccountsForm;
