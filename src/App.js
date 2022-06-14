import "./App.css";
import Home from "../src/pages/Home";
import Results from "../src/pages/Results";
import Error from "../src/pages/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
