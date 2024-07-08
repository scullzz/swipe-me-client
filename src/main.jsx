import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import { InfoPage } from "./components/InfoPage/InfoPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route Component={Main} path="/"></Route>
      <Route Component={InfoPage} path="/info"></Route>
    </Routes>
  </Router>
);
