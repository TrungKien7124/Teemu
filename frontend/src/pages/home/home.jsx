import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import authApi from "../../api/authApi";

function HomePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await authApi.me();
        setName(response.data.email.split("@")[0] || "");
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserInfo();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    console.log("User logged out");
    navigate("/sign-in");
  }

  return (
    <>
      <h1>Welcome back {name}</h1>
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
}

export default HomePage;
