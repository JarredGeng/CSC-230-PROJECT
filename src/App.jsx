import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Hero from "./Components/Hero";
import RedirectAfterConfirm from './Components/RedirectAfterConfirm';

import Home from "./pages/Home";
import ResearchPosters from "./pages/ResearchPosters";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import PosterForm from "./pages/PosterForm";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";

import StudentDashboard from './pages/studentdash';
import AdminDashboard from './pages/admindash';

const App = () => {
  return (
    <Router>
      <RedirectAfterConfirm />
      <NavBar />
      <Routes>
        <Route path="/" element={<><Hero /><Home /></>} />
        <Route path="/posters" element={<ResearchPosters />} />
        <Route path="/posterform" element={<PosterForm />} />
        <Route path="/journal/:id" element={<Journal />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/admin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentdash" element={<StudentDashboard />} />
        <Route path="/admindash" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
