import { InputData } from "./hanziData";
import { css } from "@emotion/react";
import {
  TitleHanzi,
  StrokeOrder,
  PlayGround,
  PinyinComponent,
  NoteComponent,
  HanziCompoundComponent,
} from "./HanziCard";

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
 * the browser card of hanzi
 */
export default function BrowserHanziCard({
  inputData,
}: {
  inputData: InputData;
}) {
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
