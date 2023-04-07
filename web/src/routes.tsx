import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./Pages/Home"));
const Profile = React.lazy(() => import("./Pages/Profile"));

function Routers() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
