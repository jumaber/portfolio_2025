import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          borderRadius: "8px",
          padding: "1rem",
          fontFamily: "Inter, sans-serif",
        },
        success: { className: "bg-green-500 text-white" },
        error: { className: "bg-red-500 text-white" },
        loading: { className: "bg-gray-800 text-white" },
      }}
    />
    <App />
  </BrowserRouter>
);
