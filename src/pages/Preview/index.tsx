import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InputDatas } from "../../components/hanziData";
import getSavedData from "../../components/getSavedData";
import { Box, CssBaseline, Paper, IconButton, Toolbar } from "@mui/material";
import TopAppBar from "../../components/TopAppBar";
import BottomAppBar from "../../components/BottomAppBar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { BrowserView, MobileView } from "react-device-detect";
import BrowserHanziCard from "../../components/BrowserHanziCard";
import MobileHanziCard from "../../components/MobileHanziCard";

const initialDatas: InputDatas = [
  {
    hanzi: "你",
    pinyin: "ni3",
    emphStrokeNumbers: [1, 2],
    hanziCompound: "你好",
    note: "sample note",
  },
  {
    hanzi: "好",
    pinyin: "hao3",
    emphStrokeNumbers: [2, 3, 4],
    hanziCompound: "你好",
    note: "sample note",
  },
];

/**
 * navigate before button
 */
function NavigateBeforeButton({
  current,
  setCurrent,
}: {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <IconButton
        aria-label="next button"
        sx={{
          display: current === 0 ? "none" : "block",
          position: "fixed",
          top: "50vh",
          left: 0,
        }}
      >
        <NavigateBeforeIcon
          fontSize="large"
          onClick={() => {
            setCurrent(current - 1);
          }}
        />
      </IconButton>
    </>
  );
}

/**
 * navigate next button
 */
function NavigateNextButton({
  current,
  setCurrent,
  maxLength,
}: {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
  maxLength: number;
}) {
  return (
    <>
      <IconButton
        aria-label="before button"
        sx={{
          display: current === maxLength - 1 ? "none" : "block",
          position: "fixed",
          top: "50vh",
          right: 0,
        }}
      >
        <NavigateNextIcon
          fontSize="large"
          onClick={() => {
            setCurrent(current + 1);
          }}
        />
      </IconButton>
    </>
  );
}

/**
 * navigate bar
 */
function NavigateBar({
  current,
  setCurrent,
  maxLength,
}: {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
  maxLength: number;
}) {
  return (
    <>
      <NavigateBeforeButton current={current} setCurrent={setCurrent} />
      <NavigateNextButton
        current={current}
        setCurrent={setCurrent}
        maxLength={maxLength}
      />
    </>
  );
}

function App() {
  const [inputDatas, setInputDatas] = useState<InputDatas>(initialDatas);
  const [current, setCurrent] = useState<number>(0);
  useEffect(() => {
    const savedData = getSavedData();
    if (savedData !== null) setInputDatas(savedData);
  }, []);
  return (
    <>
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <TopAppBar />
        <Toolbar />
        <BrowserView>
          {inputDatas.map((inputData, i) => (
            <React.Fragment key={i}>
              <BrowserHanziCard inputData={inputData} />
            </React.Fragment>
          ))}
        </BrowserView>
        <MobileView>
          <Paper elevation={1} sx={{ m: "12vw" }}>
            <MobileHanziCard inputData={inputDatas[current]} />
          </Paper>
          <NavigateBar
            current={current}
            setCurrent={setCurrent}
            maxLength={inputDatas.length}
          />
        </MobileView>
        <BottomAppBar />
      </Box>
    </>
  );
}

export default App;
