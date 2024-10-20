import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navigation from "./components/navigation-panel/Navigation";
import AboutMe from "./components/about-me/AboutMe";
import AboutContentMaker from "./components/about-content-maker/AboutContentMaker";
import { InfoPage } from "./components/info-page/InfoPage";
import Reward from "./components/reward/Reward";
import RedactProfile from "./components/reduct-profile/Reduct";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="home" element={<Home />} />
        <Route path="info" element={<InfoPage />}></Route>
        <Route path="about-me" element={<AboutMe />} />
        <Route path="swapper" element={<Reward />}></Route>
        <Route
          path="/about-me/refactor-profile"
          element={<RedactProfile />}
        ></Route>
      </Route>
    </Routes>
  </Router>
);
