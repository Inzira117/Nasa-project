import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rovers from "./Rover/Rover";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/rovers" element={<Rovers />} />
          <Route path="/rovers/:name" element={<Rovers />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
