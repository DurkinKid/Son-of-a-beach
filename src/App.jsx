import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderPage from "./components/Header/Header";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";

function App() {
  return (
    <>
    <HeaderPage />
    <Routes>
      <Route path="/" element={<h1>Welcome You Son's of Beaches</h1>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    </>
  );
}

export default App;
