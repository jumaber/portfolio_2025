import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SinglePage } from "./pages/SinglePage";
import { ImprintPage } from './pages/ImprintPage';
import { PageNotFound } from './pages/PageNotFound';
import { Dashboard } from './pages/Dashboard';
import { EditProject } from './pages/EditProject';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<SinglePage />} />
        <Route path="/project/:slug/edit" element={<EditProject />} />
        <Route path="/imprint" element={<ImprintPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App
