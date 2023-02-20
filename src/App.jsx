import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import Account from "./components/Account.jsx";
import Info from "./components/Info.jsx";
import PrivateRoute from "./utils/PrivateRoute";
import RedirectUser from "./utils/RedirectUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Info />} />
            <Route
              path="/login"
              element={
                <RedirectUser>
                  <Account />
                </RedirectUser>
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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
