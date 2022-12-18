import React, { useState } from "react";
import "./App.css";
import Hanzi from "./Hanzi";

function App() {
  const [hanzi, setHanzi] = useState<string[]>(["一", "丁"]);
  console.log(hanzi[0].codePointAt(0));
  return (
    <>
      <Hanzi
        hanziNumber={hanzi[1].codePointAt(0)!}
        width="100px"
        height="100px"
      ></Hanzi>
    </>
  );
}

export default App;
