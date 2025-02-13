import { useNavigate } from "react-router-dom";

function ChooseRoom() {
  const navigate = useNavigate();

  return (
    <div className="game-container">
      <div className="game-background">
        <div className="bg-grid"></div>
        <div className="bg-overlay"></div>
      </div>

      <div className="game-logo">
        <div className="logo-container">
          <div className="logo-badge">
            <svg className="badge-icon" viewBox="0 0 24 24">
              <path
                d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L20 9v6l-8 4-8-4V9l8-4.2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1>PAW & ORDER</h1>
          <div className="subtitle">
            <span className="highlight">SUPERIOR COURT</span>
            <span className="version">BETA v0.01</span>
          </div>
          <div className="court-line">WHERE JUSTICE IS PURR-FECT</div>
        </div>
      </div>

      <div className="game-card">
        <div className="card-header">
          <div className="menu-title">SELECT START</div>
          <div className="menu-divider">
            <div className="divider-line"></div>
            <div className="divider-diamond"></div>
            <div className="divider-line"></div>
          </div>
        </div>

        <div className="menu-options">
          <button
            className="menu-button primary"
            // onClick={() => onSelect("create")}
          >
            <div className="button-content">
              <div className="button-diamond"></div>
              <span className="button-text">CREATE COURT</span>
            </div>
            <div className="button-glow"></div>
          </button>

          <button
            className="menu-button secondary"
            onClick={() => navigate("/join")}
          >
            <div className="button-content">
              <div className="button-diamond"></div>
              <span className="button-text">JOIN COURT</span>
            </div>
          </button>
        </div>
      </div>

      <div className="footer">
        <a href="#" className="footer-link">
          Legal Procedures
        </a>
        <span className="footer-separator">•</span>
        <a href="#" className="footer-link">
          About The Court
        </a>
      </div>
    </div>
  );
}

export default ChooseRoom;
