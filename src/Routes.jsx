import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WithNavbar from "./layouts/WithNavbar";

import Home from "./pages/Home";
import Documents from "./pages/Documents";

const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route element={<WithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/documents" element={<Documents />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;
