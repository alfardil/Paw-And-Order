import AuthPage from "./auth/AuthPage";
import { useFetchAuthQuery } from "./auth/hooks";
import ChooseRoom from "./JoinMenu/Menu";
import { Loader } from "./ui/Loader";

export const Home = () => {
  const { data, error, isPending, refetch } = useFetchAuthQuery();

  if (isPending) {
    return <Loader />;
  }
  if (error) {
    return (
      <div>
        <h2>Error: {(error as Error).message}</h2>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  return data?.success ? <ChooseRoom /> : <AuthPage />;
};
