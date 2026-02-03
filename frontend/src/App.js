import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ContactProvider } from "./context/ContactContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <ContactProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </ContactProvider>
    </Router>
  );
}

export default App;
