  import React from "react";
  import ReactDOM from "react-dom/client";
  import App from "./App";
  import { AuthProvider } from "./AuthContext"; // Import AuthProvider
  import "./styles/global.css";

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AuthProvider> {/* Wrap App inside AuthProvider */}
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
