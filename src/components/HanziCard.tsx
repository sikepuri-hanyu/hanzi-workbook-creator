import React, { useState, useEffect } from "react";
import {
  Hanzi,
  StrokeNumbers,
  Pinyin,
  HanziCompound,
  Note,
  InputData,
  StrokesData,
} from "./hanziData";
import toneConvert from "./pinyinToneConvert";
import getStrokesData from "./getStrokesData";
import "./style.css";

function TitleHanzi({
  hanzi,
  emphStrokeNumbers,
}: {
  hanzi: Hanzi;
  emphStrokeNumbers: StrokeNumbers;
}): JSX.Element {
  const [strokesData, setStrokesData] = useState<StrokesData>([]);
  useEffect(() => {
    (async () => {
      setStrokesData(await getStrokesData(hanzi));
    })();
  }, [hanzi]);
  return (
    <>
      <svg key={`${hanzi}`} className="title-hanzi" viewBox="0 0 1024 1024">
        {strokesData.map((strokeData, j) => (
          <path
            key={`${hanzi}d${j + 1}`}
            d={strokeData}
            fill={emphStrokeNumbers.includes(j + 1) ? "red" : "black"}
          />
        ))}
      </svg>
    </>
  );
}

function StrokeOrder({ hanzi }: { hanzi: Hanzi }) {
  const [strokesData, setStrokesData] = useState<StrokesData>([]);
  useEffect(() => {
    (async () => {
      setStrokesData(await getStrokesData(hanzi));
    })();
  }, [hanzi]);
  return (
    <div className="stroke-orders">
      {strokesData.map((_, i) => (
        <svg
          key={`${hanzi}order${i}`}
          className="stroke-order"
          viewBox="0 0 1024 1024"
        >
          {strokesData.map((stroke, j) => (
            <path
              key={`${hanzi}order${i}d${j + 1}`}
              d={stroke}
              fill={i === j ? "red" : i > j ? "black" : "#ccc"}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}

function PlayGround({ hanzi }: { hanzi: Hanzi }) {
  const [strokesData, setStrokesData] = useState<StrokesData>([]);
  useEffect(() => {
    (async () => {
      setStrokesData(await getStrokesData(hanzi));
    })();
  }, [hanzi]);
  return (
    <>
      <div className="playgrounds">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="playground">
            {index === 0 && (
              <svg
                key={`playground${hanzi}`}
                viewBox="0 0 1024 1024"
                width="100%"
                height="100%"
              >
                {strokesData.map((stroke, j) => (
                  <path
                    key={`playground${hanzi}d${j + 1}`}
                    d={stroke}
                    fill="#ccc"
                  />
                ))}
              </svg>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function PinyinComponent({ pinyin }: { pinyin: Pinyin }) {
  return (
    <>
      <div lang="zh-cmn-Hans" className="title-pinyin">
        {toneConvert(pinyin)}
      </div>
    </>
  );
}

function NoteComponent({ note }: { note: Note }) {
  return (
    <>
      <div className="note">{note}</div>
    </>
  );
}

function HanziCompoundComponent({
  hanziCompound,
}: {
  hanziCompound: HanziCompound;
}) {
  return (
    <>
      <div className="hanzi-compound">
        熟語:
        <div lang="zh-cmn-Hans" style={{ marginLeft: "10px" }}>
          {hanziCompound}
        </div>
      </div>
    </>
  );
}

/**
 * the card of hanzi
 */
export default function HanziCard({ inputData }: { inputData: InputData }) {
  return (
    <>
      <div className="hanzi">
        <div className="title">
          <PinyinComponent pinyin={inputData.pinyin} />
          <TitleHanzi
            hanzi={inputData.hanzi}
            emphStrokeNumbers={inputData.emphStrokeNumbers}
          />
        </div>
        <div className="content">
          <div className="info">
            <div className="info1">
              <HanziCompoundComponent hanziCompound={inputData.hanziCompound} />
              <StrokeOrder hanzi={inputData.hanzi} />
            </div>
            <NoteComponent note={inputData.note} />
          </div>
          <PlayGround hanzi={inputData.hanzi} />
        </div>
      </div>
    </>
  );
}
