import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VoterRegistration.css";
import { getBlockchainContract } from "../blockchain";

function VoterRegistration() {
  const [aadhaar, setAadhaar] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidAadhaar = (aadhaar) => /^\d{12}$/.test(aadhaar); // Checks for 12-digit number

  const generateVoterId = () => {
    if (!isValidAadhaar(aadhaar)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    // Check if Aadhaar is already used
    const usedAadhaars = JSON.parse(localStorage.getItem("usedAadhaars")) || [];
    if (usedAadhaars.includes(aadhaar)) {
      alert("This Aadhaar number has already been used to generate a Voter ID.");
      return;
    }

    // Generate Voter ID
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedId(result);

    // Store Aadhaar in localStorage to prevent reuse
    localStorage.setItem("usedAadhaars", JSON.stringify([...usedAadhaars, aadhaar]));
  };

  const registerVoter = async () => {
    if (!generatedId) {
      alert("Please generate a voter ID first!");
      return;
    }

    setLoading(true);
    try {
      const contract = await getBlockchainContract();
      if (!contract) return;

      const tx = await contract.registerVoter(generatedId);
      await tx.wait(); // Wait for transaction confirmation

      alert(`Voter ID ${generatedId} registered successfully!`);
      navigate("/verify");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error registering voter. Make sure MetaMask is connected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>📝 Voter Registration</h2>

      {/* Aadhaar Input Field */}
      <input
        type="text"
        placeholder="Enter 12-digit Aadhaar Number"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
        maxLength={12}
        className="aadhaar-input"
      />

      {/* Generate Button (Greyed out until Aadhaar is valid) */}
      <button
        className="generate-button"
        onClick={generateVoterId}
        disabled={!isValidAadhaar(aadhaar)} // Button disabled until Aadhaar is valid
        style={{ backgroundColor: isValidAadhaar(aadhaar) ? "#28a745" : "#ccc", cursor: isValidAadhaar(aadhaar) ? "pointer" : "not-allowed" }}
      >
        Generate Voter ID
      </button>

      {generatedId && (
        <div className="id-display">
          <p>Your Voter ID:</p>
          <h3>{generatedId}</h3>
          <p className="warning">Please save this ID. You will need it to vote.</p>
          <button className="nav-button" onClick={registerVoter} disabled={loading}>
            {loading ? "Registering..." : "Register on Blockchain"}
          </button>
        </div>
      )}

      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default VoterRegistration;
