import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import VoterRegistration from "./components/VoterRegistration.jsx";
import IdentityVerification from "./components/IdentityVerification.jsx";
import VotingForm from "./components/VotingForm.jsx";
import Results from "./components/Results.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<VoterRegistration />} />
        <Route path="/verify" element={<IdentityVerification />} />
        <Route path="/vote" element={<VotingForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
