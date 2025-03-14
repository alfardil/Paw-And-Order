import { Link, useParams } from "react-router-dom";
import StartGame from "./StartGame";
import { useFindPartyQuery } from "./hooks";
import { Loader } from "../ui/Loader";
import { User } from "shared/db";

const Lobby = () => {
  const { joinedPartyId: joinedPartyId } = useParams() as {
    joinedPartyId?: string;
  };

  const partyId = joinedPartyId?.trim();

  const { data, error, isPending } = useFindPartyQuery(partyId || "");

  if (partyId === "") {
    return (
      <div className="game-container">
        <h2>Room ID is missing</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  if (isPending) return <Loader />;

  if (error) {
    return (
      <div className="game-container">
        <h2>Something went wrong, please try again.</h2>
      </div>
    );
  }

  if (!data.success) {
    return (
      <div className="game-container">
        <h2>Error: {data?.message}</h2>
      </div>
    );
  }

  const party = data.data;

  if (!party) {
    return (
      <div className="game-container">
        <h2>Error:{(error as unknown as Error).message}</h2>
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
          {party.users?.map((user: User) => (
            <li key={user.uuid}>
              {user.firstName} <br></br>
              {user.uuid}
            </li>
          ))}
        </ul>
        {party.users.length >= 2 && <StartGame party={party} />}
      </div>
    </div>
  );
};

export default Lobby;
