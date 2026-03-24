import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>Welcome, {userInfo?.name}</h1>
      <h3>Email: {userInfo?.email}</h3>
      <img src={userInfo?.image} alt={userInfo?.email} />
      <button
        className="mt-4 cursor-pointer rounded-2xl bg-black p-2 text-white"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
