import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import CreatePodcast from './Components/CreatePodcast';
import PodkastiList from './Components/PodkastList';
import EpizodaDetalji from './Components/EpizodaDetalji';
import NovaEpizodaForm from './Components/NovaEpizodaForm ';
import EpizodeList from './Components/EpizodeList';
import OmiljeniPodkasti  from './Components/Favorites';
import UserManagement from './Components/UserManagement';
import CategoryManagement from './Components/CategoryManagement';
import MojiPodkasti from './Components/MyPodcast';
import YouTubeChannelVideos from './Components/YouTubeChannelVideos';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
          <Route path="/kreirajPodkast" element={<CreatePodcast />} />
          <Route path="/podkasti" element={<PodkastiList />} />
          <Route path="/podkasti/:id" element={<EpizodeList />} />
          <Route path="/epizode/:id" element={<EpizodaDetalji />} />
          <Route path="/kreirajEpizodu" element={<NovaEpizodaForm/>} />
          <Route path="/omiljeni" element={<OmiljeniPodkasti />} />
          <Route path="/korisnici" element={<UserManagement />} />
              <Route path="/kategorije" element={<CategoryManagement/>}/>
          <Route path="/moji-podkasti" element={<MojiPodkasti/>}/>
             <Route path="/youtube" element={<YouTubeChannelVideos/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
