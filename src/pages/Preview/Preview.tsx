import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  Hanzi,
  StrokeNumbers,
  Pinyin,
  HanziCompound,
  Note,
  InputData,
  InputDatas,
  StrokesData,
} from "../../components/hanziData";
import toneConvert from "../../components/pinyinToneConvert";
import getStrokesData from "../../components/getStrokesData";

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
      <svg
        key={`${hanzi}`}
        className={styles["title-hanzi"]}
        viewBox="0 0 1024 1024"
      >
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
    <div className={styles["stroke-orders"]}>
      {strokesData.map((_, i) => (
        <svg
          key={`${hanzi}order${i}`}
          className={styles["stroke-order"]}
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
      <div className={styles.playgrounds}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className={styles.playground}>
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
      <div lang="zh-cmn-Hans" className={styles["title-pinyin"]}>
        {toneConvert(pinyin)}
      </div>
    </>
  );
}

function NoteComponent({ note }: { note: Note }) {
  return (
    <>
      <div className={styles.note}>{note}</div>
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
      <div className={styles["hanzi-compound"]}>
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
function HanziCard({ inputData }: { inputData: InputData }) {
  return (
    <>
      <div className={styles.hanzi}>
        <div className={styles.title}>
          <PinyinComponent pinyin={inputData.pinyin} />
          <TitleHanzi
            hanzi={inputData.hanzi}
            emphStrokeNumbers={inputData.emphStrokeNumbers}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.info1}>
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
