import "../App.css";
import { mockParties } from "../mockData";

function JoinCourtPage() {
  return (
    <div className="game-container">
      <div className="game-background">
        <div className="bg-grid"></div>
        <div className="bg-overlay"></div>
      </div>

      <div className="game-card join-card">
        <div className="card-header">
          <h2 className="menu-title">Join a Court</h2>
          <div className="menu-divider">
            <div className="divider-line"></div>
            <div className="divider-diamond"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="join-content">
          {mockParties.map((party) => {
            const formattedDate = new Date(party.created).toLocaleString();

            return (
              <button
                key={party.id}
                className="menu-button"
                onClick={() => console.log(`Joining party #${party.id}...`)}
              >
                <div className="button-glow"></div>
                <div className="button-content">
                  <span className="button-text">
                    Party #{party.id} (Created: {formattedDate})
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default JoinCourtPage;
