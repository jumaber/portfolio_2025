import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 
import { Home } from "./pages/Home";
import { ImprintPage } from "./pages/ImprintPage";
import { PageNotFound } from "./pages/PageNotFound";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login"; 
import { EditHome } from "./pages/edit/EditHome.jsx";
import { EditProject } from "./pages/edit/EditProject.jsx";
import { EditPage } from "./pages/edit/EditPage.jsx"
import { EditImprint } from "./pages/edit/EditImprint.jsx";
import { LoadingScreen } from "./components/other/LoadingScreen.jsx";
import { NewProject } from "./pages/new/NewProject.jsx";
import { NewPage } from "./pages/new/NewPage.jsx";
import { SinglePage } from "./pages/SinglePage.jsx";
import { SingleProject } from "./pages/SingleProject.jsx"



function App() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.uid === "i67JburFKwRSWgKaXpraD9DWioD3") {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingScreen />;


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/edit"
        element={user ? <EditHome user={user} /> : <Navigate to="/login" />}
      />
      <Route path="/project/:slug" element={<SingleProject />} />
      <Route
        path="/new/project"
        element={user ? <NewProject user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/project/:slug/edit"
        element={user ? <EditProject user={user} /> : <Navigate to="/login" />}
      />
      <Route path="/:slug" element={<SinglePage />} />
      <Route
        path="/new/page"
        element={user ? <NewPage user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/:slug/edit"
        element={user ? <EditPage user={user} /> : <Navigate to="/login" />}
      />
      <Route path="/imprint" element={<ImprintPage />} />
      <Route
        path="/imprint/edit"
        element={user ? <EditImprint user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
      
    </Routes>
  );
}

export default App;
