import React, { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Preview from "./pages/Preview";
import Print from "./pages/Print";

const ROUTER_BASENAME =
  process.env.NODE_ENV === "development" ? "/" : "/hanzi-workbook-creator";

export default function App() {
  return (
    <>
      <BrowserRouter basename={ROUTER_BASENAME}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
          <Route path="/print" element={<Print />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
