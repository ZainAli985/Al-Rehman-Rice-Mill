import React, { useState } from 'react'
import SideLinks from './SideLinks'
import AccountsForm from '../ChartOfAccounts/AccountsForm.jsx'
import styles from './Dashboard.module.css'
import AccountsList from '../ChartOfAccounts/AccountsList.jsx'
import TopMenu from '../ChartOfAccounts/topmenu.jsx'

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("create");
  return (
    <div className={styles.dashboard}>
    <SideLinks/>
    <div className={styles.formarea}>
    <TopMenu setActiveTab={setActiveTab} />
      <div style={{ padding: "20px" }}>
        {activeTab === "create" && <AccountsForm />}
        {activeTab === "accounts" && <AccountsList/> }
      </div>
      </div>
    </div>
  )
}

export default Dashboard