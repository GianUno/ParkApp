import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Seu código atual de adicionar spot pode ir aqui
//import Login from './components/Login';
import FinishedSpots from '../TableSpotF/TableSpotF';

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/login" element={<Login />} />*/}
        <Route path="home" element={<Home />} /> {/* Seu App.js atual pode ser movido para o componente Home */}
        <Route path="finished" element={<FinishedSpots />} />
        {/*<Route path="*" element={<Login />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
