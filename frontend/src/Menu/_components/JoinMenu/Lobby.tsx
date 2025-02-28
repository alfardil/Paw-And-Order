import { Link, useParams } from "react-router-dom";
import StartGame from "./StartGame";
import { useFindPartyQuery } from "./hooks";
import { Loader } from "../ui/Loader";

interface ParamTypes {
  [key: string]: string | undefined;
  joinedPartyId: string;
}

const Lobby = () => {
  const { joinedPartyId: joinedPartyId } = useParams<ParamTypes>();

  if (!joinedPartyId) {
    return (
      <div className="game-container">
        <h2>Room ID is missing</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const partyId = joinedPartyId.trim();
  console.log(partyId);
  const { data: party, error, isPending } = useFindPartyQuery(partyId);

  if (isPending) return <Loader />;
  if (!party) {
    return (
      <div>
        <h2>Error:{(error as Error).message}</h2>
      </div>
    );
  }

  if (!party) {
    return (
      <div className="game-container">
        <h2>Room not found</h2>
        <Link to="/">NO PARTY FOUND</Link>
      </div>
    );
  }

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
          {party.users?.map((user: any) => (
            <li key={user.uuid}>
              {user.firstName} ({user.authProvider}) {user.uuid}
            </li>
          ))}
        </ul>
        {(party.users ?? []).length >= 2 && <StartGame party={party} />}
      </div>
    </div>
  );
};

export default Lobby;
