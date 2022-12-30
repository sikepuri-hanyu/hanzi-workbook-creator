import React, { useEffect, useState } from "react";
import { InputDatas } from "../../components/hanziData";
import HanziCard from "../../components/HanziCard";
import getSavedData from "../../components/getSavedData";
import { Box, CssBaseline } from "@mui/material";
import TopAppBar from "../../components/TopAppBar";
import BottomAppBar from "../../components/BottomAppBar";

function App() {
  const [inputDatas, setInputDatas] = useState<InputDatas>([]);
  useEffect(() => {
    getSavedData(setInputDatas);
  }, []);
  return (
    <>
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <TopAppBar />
        {inputDatas.map((inputData, i) => (
          <React.Fragment key={i}>
            <HanziCard inputData={inputData} />
          </React.Fragment>
        ))}
        <BottomAppBar />
      </Box>
    </>
  );
}

export default App;
