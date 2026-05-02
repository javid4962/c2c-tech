import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { LearnerAuthProvider } from "./context/LearnerAuthContext";
import { SiteProvider } from "./context/SiteContext";
import "./index.css";
import "react-quill-new/dist/quill.snow.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <LearnerAuthProvider>
            <SiteProvider>
              <App />
              <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
            </SiteProvider>
          </LearnerAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
