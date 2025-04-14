import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VotingForm.css";
import { getBlockchainContract } from "../blockchain";

const VotingForm = () => {
  const [candidateIndex, setCandidateIndex] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const voterId = sessionStorage.getItem("currentVoterId");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const contract = await getBlockchainContract();
        if (!contract) return;

        const totalCandidates = 4; // Your contract has 4 candidates
        let fetchedCandidates = [];

        for (let i = 0; i < totalCandidates; i++) {
          const [name] = await contract.getCandidate(i);
          fetchedCandidates.push(name);
        }

        setCandidates(fetchedCandidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = async () => {
    if (!candidateIndex) {
      alert("Please select a candidate.");
      return;
    }
    if (!voterId) {
      alert("No voter ID found. Please verify your identity again.");
      navigate("/verify");
      return;
    }

    setLoading(true);
    try {
      const contract = await getBlockchainContract();
      if (!contract) return;

      const tx = await contract.vote(voterId, candidateIndex);
      await tx.wait(); // Wait for transaction confirmation

      alert("Your vote has been cast successfully!");
      sessionStorage.removeItem("currentVoterId"); // Clear voter session
      navigate("/");
    } catch (error) {
      console.error("Voting error:", error);
      alert("Error casting vote. Make sure MetaMask is connected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="voting-container">
      <h2>🗳️ Vote for Your Candidate</h2>
      <label>Select a Candidate:</label>
      <select value={candidateIndex} onChange={(e) => setCandidateIndex(e.target.value)}>
        <option value="">-- Choose --</option>
        {candidates.map((name, index) => (
          <option key={index} value={index}>{name}</option>
        ))}
      </select>
      <button className="vote-button" onClick={handleVote} disabled={loading || !candidateIndex}>
        {loading ? "Submitting..." : "Cast Vote"}
      </button>
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default VotingForm;
