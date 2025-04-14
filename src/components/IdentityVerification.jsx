import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/IdentityVerification.css";
import { getBlockchainContract } from "../blockchain";

function IdentityVerification() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!userId.trim()) {
      alert("Please enter a Voter ID.");
      return;
    }

    setLoading(true);
    try {
      const contract = await getBlockchainContract();
      if (!contract) return;

      // Check if voter is registered
      const isRegistered = await contract.isRegistered(userId);
      if (!isRegistered) {
        alert("This ID is not registered!");
        setLoading(false);
        return;
      }

      // Check if voter has already voted
      const hasVoted = await contract.hasVoterVoted(userId);
      if (hasVoted) {
        alert("This ID has already been used to vote!");
        setLoading(false);
        return;
      }

      // Store current voter ID in session storage
      sessionStorage.setItem("currentVoterId", userId);
      navigate("/vote");
    } catch (error) {
      console.error("Verification error:", error);
      alert("Error verifying voter ID. Make sure MetaMask is connected.");
    } finally {
      setLoading(false);
    }
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
      <button className="verify-button" onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify & Proceed"}
      </button>
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default IdentityVerification;
