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
  flex-direction: column;
  margin: 2vh 5vw;
`;

const title = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const titlePinyin = css`
  font-size: 1.3rem;
  text-align: center;
`;

const titleHanzi = css`
  width: 20vw;
  aspect-ratio: 1/1;
  border: solid 1vw lightskyblue;
  margin: 1vw auto;
`;

const hanziCompound = css`
  font-size: 1.3rem;
`;

const strokeOrders = css`
  margin: 1vw;
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
  margin: 1vw;
`;

const playground = css`
  width: 9vw;
  aspect-ratio: 1/1;
  border: 1vw solid skyblue;
  margin: 0.5vw;
`;

/**
 * the mobile card of hanzi
 */
export default function MobileHanziCard({
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
        <PlayGround
          hanzi={inputData.hanzi}
          playgroundsCss={playgrounds}
          playgroundCss={playground}
        />
      </div>
    </>
  );
}
