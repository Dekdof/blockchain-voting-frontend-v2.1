import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Results.css";
import { getBlockchainContract } from "../blockchain";

function Results() {
  const [voteCounts, setVoteCounts] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const contract = await getBlockchainContract();
        if (!contract) return;

        const totalCandidates = 4; // Your contract has 4 candidates
        let fetchedCandidates = [];
        let fetchedVoteCounts = [];

        for (let i = 0; i < totalCandidates; i++) {
          const [name, count] = await contract.getCandidate(i);
          fetchedCandidates.push(name);
          fetchedVoteCounts.push(Number(count)); // Convert BigNumber to number
        }

        setCandidates(fetchedCandidates);
        setVoteCounts(fetchedVoteCounts);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="results-container">
      <h2>📊 Election Results</h2>
      <div className="results-grid">
        {candidates.map((candidate, index) => (
          <div key={index} className="result-card">
            <h3>{candidate}</h3>
            <div className="vote-count">{voteCounts[index] || 0}</div>
            <div className="vote-label">votes</div>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default Results;
