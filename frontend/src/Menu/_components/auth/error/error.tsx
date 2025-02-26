export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">Error!</h1>
      <p className="mt-4 text-lg text-gray-700">
        An error occurred during authentication.
      </p>
    </div>
  );
};
export default Error;
