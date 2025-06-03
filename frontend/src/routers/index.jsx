import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/home.jsx";
import SignInPage from "../pages/signIn/signIn.jsx";
import SignUpPage from "../pages/signUp/signUp.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
}

export default AppRouter;
