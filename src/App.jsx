import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

import NavBar from "./Components/Navbar";
import Hero from "./Components/Hero";
import RedirectAfterConfirm from "./Components/RedirectAfterConfirm";

import Home from "./pages/Home";
import ResearchPosters from "./pages/ResearchPosters";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import PosterForm from "./pages/PosterForm";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";

import StudentDashboard from "./pages/studentdash";
import AdminDashboard from "./pages/admindash";
import ReviewQueue from "./pages/ReviewQueue";
import PosterEditorWrapper from "./pages/PosterEditorWrapper";
import FinalizeReview from "./pages/FinalizeReview";

import ManageUsers from "./pages/ManageUsers";




const AppContent = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/studentdash", "/admindash"];
  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <RedirectAfterConfirm />
      {!shouldHideNavbar && <NavBar />}
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<><Hero /><Home /></>} />
        <Route path="/posters" element={<ResearchPosters />} />
        <Route path="/posterform" element={<PosterForm />} />
        <Route path="/journal/:id" element={<Journal />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/admin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />

        {/* Student Dashboard */}
        <Route path="/studentdash" element={<StudentDashboard />} />
        <Route path="/studentdash/posterform" element={<StudentDashboard />} />
        <Route path="/studentdash/inreview" element={<StudentDashboard />} />

        {/* Admin Dashboard with Nested Routes */}
        <Route path="/admindash" element={<AdminDashboard />}>
          <Route index element={
            <>
              <h1>Welcome to the Admin Dashboard 🛠️</h1>
              <p>Review, edit, and publish student posters from here.</p>
            </>
          } />
          <Route path="reviewqueue" element={<ReviewQueue />} />
          <Route path="/admindash/manage-users" element={<ManageUsers />} />
          <Route path="editor/:posterId" element={<PosterEditorWrapper />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
