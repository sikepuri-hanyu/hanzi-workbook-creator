import React, { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Preview from "./pages/Preview/Preview";

const ROUTER_BASENAME =
  process.env.NODE_ENV === "development" ? "/" : "/hanzi-workbook-creator";

export default function App() {
  return (
    <>
      <BrowserRouter basename={ROUTER_BASENAME}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
