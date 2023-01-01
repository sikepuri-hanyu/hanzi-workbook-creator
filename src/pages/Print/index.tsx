import React, { useEffect, useState } from "react";
import { InputDatas } from "../../components/hanziData";
import getSavedData from "../../components/getSavedData";
import BrowserHanziCard from "../../components/BrowserHanziCard";

function App() {
  const [inputDatas, setInputDatas] = useState<InputDatas>([]);
  useEffect(() => {
    const savedData = getSavedData();
    if (savedData !== null) setInputDatas(savedData);
  }, []);
  return (
    <>
      {inputDatas.map((inputData, i) => (
        <React.Fragment key={i}>
          <BrowserHanziCard inputData={inputData} />
        </React.Fragment>
      ))}
    </>
  );
}

export default App;
