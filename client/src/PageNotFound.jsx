import { useNavigate } from "react-router-dom";
export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <h2 className="text-2xl font-semibold">404 Page Not Found</h2>
      <button onClick={() => navigate("/login")} className="p-4 text-2xl bg-gray-800 text-white rounded-2xl cursor-pointer mt-4">
        Login
      </button>
    </div>
  );
};
