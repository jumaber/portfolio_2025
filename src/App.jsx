import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { SinglePage } from "./pages/SinglePage";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<SinglePage />} />
      </Routes>
    </>
  );
}

export default App
