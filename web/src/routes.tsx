import { Autocomplete, TextField } from "@mui/material"
import React from "react";
import {

  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


const Home = React.lazy(() => import('./Pages/Home'))


function Routers() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default Routers
