/**@jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { InputData, InputDatas } from "../../components/hanziData";
import getSavedData from "../../components/getSavedData";
import { css } from "@emotion/react";
import {
  TitleHanzi,
  StrokeOrder,
  PlayGround,
  PinyinComponent,
  NoteComponent,
  HanziCompoundComponent,
} from "../../components/HanziCard";

const hanziCard = css`
  display: flex;
  flex-direction: row;
  margin: 50px 10px;
`;

const title = css`
  width: 100px;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;

const titlePinyin = css`
  font-size: 20px;
  text-align: center;
`;

const titleHanzi = css`
  width: 100px;
  aspect-ratio: 1/1;
  border: solid 4px lightskyblue;
  margin-top: 10px;
`;

const content = css`
  display: flex;
  flex-direction: column;
`;

const info = css`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto auto;
`;

const hanziCompound = css`
  grid-column: 1/2;
  grid-row: 1/2;
  font-size: 20px;
`;

const strokeOrders = css`
  grid-column: 2/3;
  grid-row: 1/2;
  margin-left: 20px;
`;

const strokeOrder = css`
  width: 50px;
  aspect-ratio: 1/1;
`;

const note = css`
  grid-column: 1/3;
  grid-row: 2/3;
  font-size: 15px;
  margin-bottom: 15px;
`;

const playgrounds = css`
  display: flex;
`;

const playground = css`
  width: 80px;
  aspect-ratio: 1/1;
  border: solid 4px lightskyblue;
  margin: 6px;
`;

/**
 * the card of hanzi
 */
export function HanziCard({ inputData }: { inputData: InputData }) {
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
        <div css={content}>
          <div css={info}>
            <HanziCompoundComponent
              hanziCompound={inputData.hanziCompound}
              style={hanziCompound}
            />
            <StrokeOrder
              hanzi={inputData.hanzi}
              strokeOrdersCss={strokeOrders}
              strokeOrderCss={strokeOrder}
            />
            <NoteComponent note={inputData.note} style={note} />
          </div>
          <PlayGround
            hanzi={inputData.hanzi}
            playgroundsCss={playgrounds}
            playgroundCss={playground}
          />
        </div>
      </div>
    </>
  );
}

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
