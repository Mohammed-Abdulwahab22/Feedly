import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from "./Pages/Home";
import {FeedbackDetails} from "./Pages/FeedbackDetails";
import {Login} from "./Pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback/:id" element={<FeedbackDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
