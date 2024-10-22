import "./App.css";
import { Routes, Route } from "react-router-dom";
import PickPlayers from "./pages/PickPlayers";
import Navbar from "./components/NavBar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/team" element={<PickPlayers />} />
      </Routes>
    </>
  );
}

export default App;
