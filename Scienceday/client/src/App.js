import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scienceday from "./components/IPRScienceVisitform";
import Login from "./components/login";
import Register from "./components/register";
import Submit from "./components/SubmitPage";
import "./index.css";
import IPRScienceVisitform from "./forms/IPRScienceVisitForm";
import CompetitionForm from "../src/forms/CompetitionForm";
const App = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/IPRForm" element={<IPRScienceVisitform />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/competition" element={<CompetitionForm />} />
      </Routes>
    </Router>
  );
};

export default App;