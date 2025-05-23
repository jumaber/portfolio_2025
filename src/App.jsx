import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Home } from './pages/Home';
import { SinglePage } from "./pages/SinglePage";
import { ImprintPage } from './pages/ImprintPage';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<SinglePage />} />
        <Route path="/imprint" element={<ImprintPage />} />
      </Routes>
    </>
  );
}

export default App
