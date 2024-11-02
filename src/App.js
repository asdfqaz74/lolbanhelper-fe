import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/navbar";
import PickPlayers from "./pages/PickPlayers";
import HomePage from "./pages/HomePage";
import PlayerDB from "./pages/PlayerDB";
import ArchivePage from "./pages/ArchivePage";
import PlayerStats from "./pages/PlayerStats";
import EditPlayer from "./pages/EditPlayer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddPlayerResult from "./pages/AddPlayerResult";
import { Provider } from "jotai";

function App() {
  return (
    <Provider>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<PickPlayers />} />
          <Route path="/playerdb" element={<PlayerDB />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/playerdb/:id" element={<PlayerStats />} />
          <Route path="/playerdb/:id/edit" element={<EditPlayer />} />
          <Route path="/playerdb/:id/record" element={<AddPlayerResult />} />
        </Routes>
      </DndProvider>
    </Provider>
  );
}

export default App;
