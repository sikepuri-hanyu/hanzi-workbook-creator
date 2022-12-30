import React, { useEffect, useState } from "react";
import { InputDatas } from "../../components/hanziData";
import HanziCard from "../../components/HanziCard";
import getSavedData from "../../components/getSavedData";
import "./style-preview.css";

function App() {
  const [inputDatas, setInputDatas] = useState<InputDatas>([]);
  useEffect(() => {
    getSavedData(setInputDatas);
  }, []);
  return (
    <>
      {inputDatas.map((inputData, i) => (
        <React.Fragment key={i}>
          <HanziCard inputData={inputData} />
        </React.Fragment>
      ))}
    </>
  );
}

export default App;
