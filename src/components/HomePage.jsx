import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>🗳️ Welcome to Blockchain Voting System</h2>
      <div className="button-container">
        <button className="home-button" onClick={() => navigate("/register")}>
          Register as Voter
        </button>
        <button className="home-button" onClick={() => navigate("/verify")}>
          Vote Now
        </button>
        <button className="home-button results-button" onClick={() => navigate("/results")}>
          View Results
        </button>
      </div>
    </div>
  );
}

export default HomePage; 