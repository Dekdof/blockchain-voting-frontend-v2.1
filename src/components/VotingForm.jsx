import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VotingForm.css"; // Import CSS

const VotingForm = () => {
  const [candidate, setCandidate] = useState("");
  const navigate = useNavigate();
  const candidates = ["Alice", "Bob", "Charlie", "David"]; // Added "David" as the fourth candidate

  // Check if user has already voted when component mounts
  useEffect(() => {
    const currentVoterId = localStorage.getItem('currentVoterId');
    const votedIds = JSON.parse(localStorage.getItem('votedIds') || '[]');
    
    if (votedIds.includes(currentVoterId)) {
      alert("You have already voted!");
      navigate('/');
    }
  }, [navigate]);

  const handleVote = async () => {
    const currentVoterId = localStorage.getItem('currentVoterId');
    const votedIds = JSON.parse(localStorage.getItem('votedIds') || '[]');
    
    if (votedIds.includes(currentVoterId)) {
      alert("You have already voted!");
      navigate('/');
      return;
    }

    // Store the ID as voted
    localStorage.setItem('votedIds', JSON.stringify([...votedIds, currentVoterId]));
    
    // Store the vote
    const votes = JSON.parse(localStorage.getItem('votes') || '{}');
    votes[currentVoterId] = candidate;
    localStorage.setItem('votes', JSON.stringify(votes));
    
    alert(`You voted for ${candidate}`);
    navigate('/');
  };

  return (
    <div className="voting-container">
      <h2>🗳️ Vote for Your Candidate</h2>
      <label>Select a Candidate:</label>
      <select value={candidate} onChange={(e) => setCandidate(e.target.value)}>
        <option value="">-- Choose --</option>
        {candidates.map((c, index) => (
          <option key={index} value={c}>{c}</option>
        ))}
      </select>
      <button className="vote-button" onClick={handleVote} disabled={!candidate}>
        Cast Vote
      </button>
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default VotingForm;