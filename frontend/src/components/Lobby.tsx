import { Link, useParams } from "react-router-dom";
import { mockParties, mockUsers } from "../mockData";
import "../App.css";
import StartGame from "./StartGame";

interface ParamTypes {
  [key: string]: string | undefined;
  roomId: string;
}

function Lobby() {
  const { roomId } = useParams<ParamTypes>();

  if (!roomId) {
    return (
      <div className="game-container">
        <h2>Room ID is missing</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const party = mockParties.find((p) => p.id === parseInt(roomId, 10));

  if (!party) {
    return (
      <div className="game-container">
        <h2>Room not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const usersInRoom = mockUsers.filter((user) =>
    party.userIds.includes(user.userId)
  );
  console.log(usersInRoom);

  return (
    <div className="game-container">
      <Link to="/">
        <div
          className="back-button"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1000,
          }}
        >
          <button
            className="menu-button"
            style={{
              fontSize: "1.5em",
              padding: "12px 24px",
              borderRadius: "8px",
            }}
          >
            Back
          </button>
        </div>
      </Link>
      <div className="game-card room-details-card">
        <h1>{party.roomCode}</h1>
        <h2>{party.name}</h2>
        <h2>Prompt: {party.prompt}</h2>
        <h3>Users in this room:</h3>
        <ul>
          {usersInRoom.map((user) => (
            <li key={user.userId}>
              {user.name} ({user.authProvider})
            </li>
          ))}
        </ul>
        <StartGame playerCount={usersInRoom.length} />
      </div>
    </div>
  );
}

export default Lobby;
