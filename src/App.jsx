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
import { EditImprint } from "./pages/EditImprint.jsx";
import { EditProject } from "./pages/EditProject";



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

  if (loading) return <div className="p-4">Loading...</div>;


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/edit"
        element={user ? <EditHome user={name} /> : <Navigate to="/login" />}
      />
      <Route path="/project/:slug" element={<SinglePage />} />
      <Route
        path="/project/:slug/edit"
        element={user ? <EditProject user={name} /> : <Navigate to="/login" />}
      />
      <Route path="/imprint" element={<ImprintPage />} />
      <Route
        path="/imprint/edit"
        element={user ? <EditImprint user={name} /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={name} /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
