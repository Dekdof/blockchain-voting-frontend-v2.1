import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IdentityVerification.css"; // Import CSS

function IdentityVerification() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    const validIds = JSON.parse(localStorage.getItem('validVoterIds') || '[]');
    const votedIds = JSON.parse(localStorage.getItem('votedIds') || '[]');
    
    if (!userId.trim()) {
      alert("Please enter a Voter ID.");
      return;
    }

    if (!validIds.includes(userId.trim())) {
      alert("Please enter a valid Voter ID.");
      return;
    }

    if (votedIds.includes(userId.trim())) {
      alert("This ID has already been used to vote!");
      return;
    }

    // Store the current voter's ID
    localStorage.setItem('currentVoterId', userId.trim());
    navigate("/vote");
  };

  return (
    <div className="verification-container">
      <h2>🔒 Identity Verification</h2>
      <label>Enter Your Voter ID:</label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value.toUpperCase())}
        placeholder="Enter your ID..."
      />
      <button className="verify-button" onClick={handleVerify}>
        Verify & Proceed
      </button>
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}

export default IdentityVerification;
