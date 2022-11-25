import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import * as dayjs from "dayjs";
import "./App.css";
//context
import InvoicePage from "./pages/InvoicePage";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="invoices" element={<InvoicePage />} />
          <Route path="projects" element={<ProjectPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
