import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // ✅ Adjust path as needed

import { Home } from "./pages/Home";
import { SinglePage } from "./pages/SinglePage";
import { ImprintPage } from "./pages/ImprintPage";
import { PageNotFound } from "./pages/PageNotFound";
import { Dashboard } from "./pages/Dashboard";
import { EditProject } from "./pages/EditProject";
import { Login } from "./pages/Login"; // ✅ Add your login page import

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

  const name = user?.email === "hi@juliamaribernaus.com" ? "Júlia" : "Stranger";
  if (loading) return <div className="p-4">Loading your magic...</div>;


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<SinglePage />} />
      <Route
        path="/project/:slug/edit"
        element={user ? <EditProject user={name} /> : <Navigate to="/login" />}
      />
      <Route path="/imprint" element={<ImprintPage />} />
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
