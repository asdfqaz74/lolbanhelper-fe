import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/navbar";
import PickPlayers from "./pages/PickPlayers";
import HomePage from "./pages/HomePage";
import PlayerDB2 from "./pages/PlayerDB2";
import MatchHistory from "./pages/MatchHistory";
import PlayerStats from "./pages/PlayerStats";
import EditPlayer from "./pages/EditPlayer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddPlayerResult from "./pages/AddPlayerResult";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer } from "components/footer/Footer";
import MatchGroup from "pages/MatchGroup";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<PickPlayers />} />
            <Route path="/playerdb" element={<PlayerDB2 />} />
            <Route path="/history" element={<MatchHistory />} />
            <Route path="/history/group" element={<MatchGroup />} />
            <Route path="/playerdb/:id" element={<PlayerStats />} />
            <Route path="/playerdb/:id/edit" element={<EditPlayer />} />
            <Route path="/playerdb/:id/record" element={<AddPlayerResult />} />
          </Routes>
        </DndProvider>
        <Footer />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
