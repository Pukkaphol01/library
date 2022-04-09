import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Books from './Component/books';
import Addbook from './Component/Addbook';
import Edit from './Component/Edit';
import Register from './Component/Register';
import Login from './Component/Login';
import Loan from './Component/Laon/laonbook'
import Loanlist from './Component/Laon/loanbooklist'
import History from './Component/Laon/history'
import EditLoan from './Component/Laon/editloan'
import Home from './Component/Home'




ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path= "/books" element={<Books />} />
      <Route path= "/addbook" element={<Addbook />} />
      <Route path="/edit/:Bookid" element ={<Edit />} />
      <Route path="/register" element ={<Register />} />
      <Route path="/login" element ={<Login />} />
      <Route path="/loan" element ={<Loan />} />
      <Route path="/loanlist" element ={<Loanlist />} />
      <Route path="/history" element ={<History />} />
      <Route path="/" element ={<Home />} />
      <Route path="/loan/:Borrowid" element ={<EditLoan />} />
      
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
