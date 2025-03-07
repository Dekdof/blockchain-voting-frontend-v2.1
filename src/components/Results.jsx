import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Results.css";

function Results() {
  const [voteCounts, setVoteCounts] = useState({});
  const navigate = useNavigate();
  const candidates = ["Alice", "Bob", "Charlie", "David"];

  useEffect(() => {
    // Get all votes from localStorage
    const votedIds = JSON.parse(localStorage.getItem('votedIds') || '[]');
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    
    // Count votes for each candidate
    const counts = candidates.reduce((acc, candidate) => {
      acc[candidate] = 0;
      return acc;
    }, {});

    // Count the votes
    votedIds.forEach(id => {
      if (votes[id]) {
        counts[votes[id]] = (counts[votes[id]] || 0) + 1;
      }
    });

    setVoteCounts(counts);
  }, []);

  return (
    <div className="results-container">
      <h2>📊 Election Results</h2>
      <div className="results-grid">
        {candidates.map(candidate => (
          <div key={candidate} className="result-card">
            <h3>{candidate}</h3>
            <div className="vote-count">{voteCounts[candidate] || 0}</div>
            <div className="vote-label">votes</div>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}

export default Results;
