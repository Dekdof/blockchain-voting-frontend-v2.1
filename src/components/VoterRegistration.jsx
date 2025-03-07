import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VoterRegistration.css";

function VoterRegistration() {
  const [generatedId, setGeneratedId] = useState("");
  const navigate = useNavigate();

  const generateVoterId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedId(result);
    
    // Store the ID in localStorage
    const existingIds = JSON.parse(localStorage.getItem('validVoterIds') || '[]');
    localStorage.setItem('validVoterIds', JSON.stringify([...existingIds, result]));
  };

  return (
    <div className="registration-container">
      <h2>📝 Voter Registration</h2>
      <button className="generate-button" onClick={generateVoterId}>
        Generate Voter ID
      </button>
      {generatedId && (
        <div className="id-display">
          <p>Your Voter ID:</p>
          <h3>{generatedId}</h3>
          <p className="warning">Please save this ID. You will need it to vote.</p>
          <button className="nav-button" onClick={() => navigate("/verify")}>
            Proceed to Vote
          </button>
        </div>
      )}
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}

export default VoterRegistration; 