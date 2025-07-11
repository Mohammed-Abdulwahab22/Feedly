import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home";
import { FeedbackDetails } from "./Pages/FeedbackDetails";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/feedback/:id" element={<FeedbackDetails />} />
        </Route>


        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
