import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Home from "./pages/Home";
import ResearchPosters from "./pages/ResearchPosters";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import PosterForm from "./pages/PosterForm";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import Hero from "./Components/Hero"; // Keep Hero only for Home

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<><Hero /><Home /></>} /> {/* Hero only on Home */}
        <Route path="/posters" element={<ResearchPosters />} />
        <Route path="/posterform" element={<PosterForm />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/admin" element={<SignIn />} />
        <Route path="/login/:role" element={<Login />} /> {/* Dynamic Login Page */}
      </Routes>
    </Router>
  );
};

export default App;
