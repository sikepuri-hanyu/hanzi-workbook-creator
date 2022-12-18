import React, { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Preview from "./pages/Preview/Preview";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
