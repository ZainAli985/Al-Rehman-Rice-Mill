import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import GeneralEntryForm from './components/GeneralEntriesForm/GeneralEntryForm';
import GeneralEntriesPage from './components/GeneralEntriesForm/GeneralEntriesPage';
import AccountsForm from './components/ChartOfAccounts/AccountsForm';
import LedgerPage from './components/Ledger/LedgerPage';
import PurchaseInvoiceForm from './components/Invoices/PurchaseInvoiceForm';
import PurchaseInvoicePage from './components/Invoices/PurchaseInvoicePage';
import SalesInvoice from './components/Invoices/SalesInvoice';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/general-entries' element={<GeneralEntriesPage/>}/>
        <Route path='/ledger' element={<LedgerPage/>}/>
        <Route path='/purchaseinvoicecreate' element={<PurchaseInvoiceForm/>}/>
        <Route path="/purchaseinvoicesview" element={<PurchaseInvoicePage />} />
        <Route path="/salesinvoice" element={<SalesInvoice/>} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
