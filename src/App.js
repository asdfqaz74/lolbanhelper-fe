import "./App.css";
import { Routes, Route } from "react-router-dom";
import PickPlayers from "./pages/PickPlayers";
import HomePage from "./pages/HomePage";
import PlayerDB from "./pages/PlayerDB";
import ArchivePage from "./pages/ArchivePage";
import Navbar from "./components/NavBar/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<PickPlayers />} />
        <Route path="/playerdb" element={<PlayerDB />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </>
  );
}

export default App;
