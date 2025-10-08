import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Rovers from "./Rover/Rover";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import RoverPhotos from "./RoverPhotos/RoverPhotos";

export default function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/rovers" />} />
          <Route path="/rovers" element={<Rovers />} />
          <Route path="/rovers/:name" element={<RoverPhotos />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
