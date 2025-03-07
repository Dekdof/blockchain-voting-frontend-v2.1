import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import IdentityVerification from "./components/IdentityVerification";
import VoterRegistration from "./components/VoterRegistration";
import VotingForm from "./components/VotingForm";
import Results from "./components/Results";
import "./App.css"; // Import global CSS

function App() {
  return (
    <div className="app-container">
      <h1>🔗 Blockchain Voting System</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<VoterRegistration />} />
        <Route path="/verify" element={<IdentityVerification />} />
        <Route path="/vote" element={<VotingForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}

export default App;
