/**@jsxImportSource @emotion/react */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InputData, InputDatas } from "../../components/hanziData";
import getSavedData from "../../components/getSavedData";
import { Box, CssBaseline, Paper, IconButton } from "@mui/material";
import TopAppBar from "../../components/TopAppBar";
import BottomAppBar from "../../components/BottomAppBar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { BrowserView, MobileView } from "react-device-detect";
import { HanziCard as PrintHanziCard } from "../Print";
import { css } from "@emotion/react";
import {
  TitleHanzi,
  StrokeOrder,
  PlayGround,
  PinyinComponent,
  NoteComponent,
  HanziCompoundComponent,
} from "../../components/HanziCard";

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

const hanziCard = css`
  display: flex;
  flex-direction: column;
  margin: 2vh 5vw;
`;

const title = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const titlePinyin = css`
  font-size: 1.5rem;
  text-align: center;
`;

const titleHanzi = css`
  width: 20vw;
  aspect-ratio: 1/1;
  border: solid 1vw lightskyblue;
  margin: 1vw auto;
`;

const hanziCompound = css`
  font-size: 1.2rem;
`;

const strokeOrder = css`
  width: 10vw;
  aspect-ratio: 1/1;
  margin: 1vw;
`;

const note = css`
  font-size: 1rem;
  margin: 1vw;
`;

const playgrounds = css`
  display: flex;
  margin: 1vw;
`;

const playground = css`
  width: 10vw;
  aspect-ratio: 1/1;
  border: 1vw solid skyblue;
  margin: 1vw;
`;

/**
 * the card of hanzi
 */
function HanziCard({ inputData }: { inputData: InputData }) {
  return (
    <>
      <div css={hanziCard}>
        <div css={title}>
          <PinyinComponent pinyin={inputData.pinyin} style={titlePinyin} />
          <TitleHanzi
            hanzi={inputData.hanzi}
            emphStrokeNumbers={inputData.emphStrokeNumbers}
            style={titleHanzi}
          />
        </div>
        <HanziCompoundComponent
          hanziCompound={inputData.hanziCompound}
          style={hanziCompound}
        />
        <StrokeOrder hanzi={inputData.hanzi} strokeOrderCss={strokeOrder} />
        <NoteComponent note={inputData.note} style={note} />
        <PlayGround
          hanzi={inputData.hanzi}
          playgroundsCss={playgrounds}
          playgroundCss={playground}
        />
      </div>
    </>
  );
}

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
    getSavedData(setInputDatas);
  }, []);
  return (
    <>
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <TopAppBar />
        <BrowserView>
          {inputDatas.map((inputData, i) => (
            <React.Fragment key={i}>
              <PrintHanziCard inputData={inputData} />
            </React.Fragment>
          ))}
        </BrowserView>
        <MobileView>
          <Paper elevation={1}>
            <HanziCard inputData={inputDatas[current]} />
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
