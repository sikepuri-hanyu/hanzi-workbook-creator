import React, { useEffect, useState } from "react";
import { InputDatas } from "../../components/hanziData";
import HanziCard from "../../components/HanziCard";

function App() {
  const [inputDatas, setInputDatas] = useState<InputDatas>([]);
  useEffect(() => {
    const response = localStorage.getItem("savedBackupData");
    if (response !== null) {
      const tmp = [];
      for (const item of JSON.parse(response)) {
        tmp.push(item);
      }
      setInputDatas(tmp);
    }
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
