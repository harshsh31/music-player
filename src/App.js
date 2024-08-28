import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import ForYou from "./pages/ForYou";
import Player from "./components/Player.js";
import Nav from "./components/Nav.js";
import { useSelector } from "react-redux";
import NoSongSelected from "./components/NoSongSelected.js";

function App() {
  const { selectedSong } = useSelector((state) => state.music);

  return (
    <Router>
      <main>
        <Header />
        <div className="nav-spacer">
          <Nav />
          <Routes>
            <Route path="/for-you" element={<ForYou />} />
            <Route path="/top-tracks" element={<ForYou isTopTrack={true} />} />
            <Route path="/" exact element={<Navigate to="/for-you" />} />
          </Routes>
        </div>
        {selectedSong !== null ? <Player /> : <NoSongSelected />}
      </main>
    </Router>
  );
}

export default App;
