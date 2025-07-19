import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import CreatePodcast from './Components/CreatePodcast';
import PodkastiList from './Components/PodkastList';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/register" element={<Register />} />
                  <Route path="/kreirajPodkast" element={<CreatePodcast />} />
          <Route path="/podkasti" element={<PodkastiList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
