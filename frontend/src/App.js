import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import AfterLogin from "./pages/AfterLogin";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Mypage from "./pages/Mypage";
import Start from "./pages/Start";
import ChoiceCartoon from "./pages/ChoiceCartooon";
import Background from "./pages/Background";
import Result from "./pages/Result";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/afterlogin" element={<AfterLogin />} />
          <Route path="/join" element={<Join />} />
          <Route path="/start" element={<Start />} />
          <Route path="/choicecartoon" element={<ChoiceCartoon />} />
          <Route path="/background" element={<Background />} />
          <Route path="/result" element={<Result />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
