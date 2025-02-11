import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Home from "./pages/Home";
import ResearchPosters from "./pages/ResearchPosters";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Admin from "./pages/Admin";
import PosterForm from "./pages/PosterForm";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Hero />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posters" element={<ResearchPosters />} />
        <Route path="/PosterForm" element={<PosterForm />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;