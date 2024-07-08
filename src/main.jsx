import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navigation from "./components/navigation-panel/Navigation";
import AboutMe from "./components/about-me/AboutMe";
import { InfoPage } from "./components/InfoPage/InfoPage";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="home" element={<Home />} />
        <Route path="info" element={<InfoPage />}></Route>
        <Route path="about-me" element={<AboutMe />} />
      </Route>
    </Routes>
  </Router>
);
