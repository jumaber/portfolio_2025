import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 

import { Home } from "./pages/Home";
import { SinglePage } from "./pages/SinglePage";
import { ImprintPage } from "./pages/ImprintPage";
import { PageNotFound } from "./pages/PageNotFound";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login"; 
import { EditHome } from "./pages/EditHome.jsx";
import { EditProject } from "./pages/EditProject";
import { EditImprint } from "./pages/EditImprint.jsx";
import { LoadingAnimation } from "./components/other/LoadingAnimation.jsx";
import { NewProject } from "./pages/NewProject.jsx";
import { NewPage } from "./pages/NewPage.jsx";





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

  if (loading) return <LoadingAnimation />


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/edit"
        element={user ? <EditHome user={user} /> : <Navigate to="/login" />}
      />
      <Route path="/project/:slug" element={<SinglePage />} />
      <Route
        path="/project/:slug/edit"
        element={user ? <EditProject user={user} /> : <Navigate to="/login" />}
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
      <Route
        path="/new/project"
        element={user ? <NewProject user={user} /> : <Navigate to="/login" />}
      />
      <Route
        path="/new/project"
        element={user ? <NewPage user={user} /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
