import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { AnonRoute } from "./components/auth/AnonRoute";
import { Home } from "./pages/Home";
import { ImprintPage } from "./pages/ImprintPage";
import { PageNotFound } from "./pages/PageNotFound";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login"; 
import { EditHome } from "./pages/edit/EditHome.jsx";
import { EditProject } from "./pages/edit/EditProject.jsx";
import { EditPage } from "./pages/edit/EditPage.jsx"
import { EditImprint } from "./pages/edit/EditImprint.jsx";
import { NewProject } from "./pages/new/NewProject.jsx";
import { NewPage } from "./pages/new/NewPage.jsx";
import { SinglePage } from "./pages/SinglePage.jsx";
import { SingleProject } from "./pages/SingleProject.jsx"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/edit"
        element={
          <PrivateRoute>
            <EditHome />
          </PrivateRoute>
        }
      />
      <Route path="/project/:slug" element={<SingleProject />} />
      <Route
        path="/new/project"
        element={
          <PrivateRoute>
            <NewProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:slug/edit"
        element={
          <PrivateRoute>
            <EditProject />
          </PrivateRoute>
        }
      />
      <Route path="/:slug" element={<SinglePage />} />
      <Route
        path="/new/page"
        element={
          <PrivateRoute>
            <NewPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/:slug/edit"
        element={
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        }
      />
      <Route path="/imprint" element={<ImprintPage />} />
      <Route
        path="/imprint/edit"
        element={
          <PrivateRoute>
            <EditImprint />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={
        <AnonRoute>
          <Login />
        </AnonRoute>
      } />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
