// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./Header/Header";
// import Footer from "./Footer/Footer";
// import Rover from "./Rover/Rover";

// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/rovers/:roverName" element={<Rover />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rovers from "./Rover/Rover";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rovers" element={<Rovers />} />
        <Route path="/rovers/:name" element={<Rovers />} />
      </Routes>
    </Router>
  );
}

export default App;
