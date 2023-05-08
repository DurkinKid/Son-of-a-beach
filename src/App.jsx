import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HeaderPage from "./components/Header/Header";
import { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import userService from "./utils/userService";

function App() {

  const [user, setUser] = useState(userService.getUser());

  function handleAuth(){
    setUser(userService.getUser())
  }

  function handlelogout(){
    console.log("logging out")
    userService.logout();
    setUser(null);
  }
  if(user) {

  return (
    <>
    <HeaderPage /><hr/>
    <Routes>
      <Route path="/" element={<FeedPage loggedUser={user} />} />
      <Route path="/login" element={<LoginPage handleAuth={handleAuth} />} />
      <Route path="/signup" element={<SignUpPage handleAuth={handleAuth} />} />
    </Routes>
    </>
  );
}
  return (
    <>
    <HeaderPage /><hr/>
    <Routes>
      <Route path="/login" element={<LoginPage handleAuth={handleAuth} />} />
      <Route path="/signup" element={<SignUpPage handleAuth={handleAuth} />} />
      <Route path="/*" element={<Navigate to="/login" />} />    
    </Routes>
    </>
  )

}

export default App;
