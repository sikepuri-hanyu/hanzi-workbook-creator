import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  StrokeNumbers,
  Pinyin,
  HanziCompound,
  InputData,
} from "../../components/hanziData";
import toneConvert from "../../components/pinyinToneConvert";

type HanziCode = number;
type StrokeData = string;
type StrokesData = [...StrokeData[]];
type HanziData = { hanziCode: HanziCode; strokesData: StrokesData };

/**
 * Convert character to decimal unicode
 */
function getDecimalUnicode(character: string): number | undefined {
  return character[0].codePointAt(0);
}

/**
 * Get strokes data
 * @param hanziCode the decimal unicode of hanzi
 * @returns the array of strokes data
 */
async function getStrokesData(hanziCode: HanziCode) {
  let result: HanziData | undefined = { hanziCode: 0, strokesData: [] };
  await fetch(
    `https://raw.githubusercontent.com/parsimonhi/animCJK/master/svgsZhHans/${hanziCode}.svg`
  )
    .then(async (response) => await response.text())
    .then((text) => {
      const reg = new RegExp(`id="z${hanziCode}d.+" d=".*"`, "g");
      const strokesData: StrokesData = text
        .match(reg)
        ?.map((char) => char.replace(/id=".*" d=/, "").replaceAll('"', ""))!;
      result = { hanziCode: hanziCode, strokesData: strokesData };
    });
  return result;
}

function TitleHanzi({
  hanziData,
  emphStrokeNumbers,
}: {
  hanziData: HanziData;
  emphStrokeNumbers: StrokeNumbers;
}): JSX.Element {
  return (
    <>
      <svg
        key={`${hanziData.hanziCode}`}
        className={styles["title-hanzi"]}
        viewBox="0 0 1024 1024"
      >
        {hanziData.strokesData.map((stroke, j) => (
          <path
            key={`${hanziData.hanziCode}d${j + 1}`}
            d={stroke}
            fill={emphStrokeNumbers.includes(j + 1) ? "red" : "black"}
          />
        ))}
      </svg>
    </>
  );
}

function StrokeOrder({ hanziData }: { hanziData: HanziData }) {
  return (
    <div className={styles["stroke-orders"]}>
      {hanziData.strokesData.map((stroke, i) => (
        <svg
          key={`${hanziData.hanziCode}order${i}`}
          className={styles["stroke-order"]}
          viewBox="0 0 1024 1024"
        >
          {hanziData.strokesData.map((stroke, j) => (
            <path
              key={`${hanziData.hanziCode}order${i}d${j + 1}`}
              d={stroke}
              fill={i === j ? "red" : i > j ? "black" : "#ccc"}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}

function PlayGround({ hanziData }: { hanziData: HanziData }) {
  return (
    <>
      <div className={styles.playgrounds}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div key={index} className={styles.playground}>
            {index === 0 && (
              <svg
                key={`playground${hanziData.hanziCode}`}
                viewBox="0 0 1024 1024"
                width="100%"
                height="100%"
              >
                {hanziData.strokesData.map((stroke, j) => (
                  <path
                    key={`playground${hanziData.hanziCode}d${j + 1}`}
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

function App() {
  const [inputDatas, setInputDatas] = useState<InputData[]>([]);
  const [hanziDatas, setHanziDatas] = useState<HanziData[]>([]);
  useEffect(() => {
    (async () => {
      const tmp = [];
      for (const inputData of inputDatas) {
        tmp.push(await getStrokesData(getDecimalUnicode(inputData.hanzi)!));
      }
      setHanziDatas(tmp);
    })();
  }, [inputDatas]);
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
  const [shouldDeleteButton, setShouldDeleteButton] = useState<boolean>(false);
  return (
    <>
      {!shouldDeleteButton && (
        <>
          <input
            type="file"
            accept="json"
            onChange={async (e) => {
              if (e.target.files !== null) {
                const reader = new FileReader();
                const file = e.target.files[0];
                reader.readAsText(file, "utf-8");
                reader.onload = () => {
                  setInputDatas(JSON.parse(reader.result as string));
                };
              }
            }}
          />
          <button
            onClick={() => {
              const response = localStorage.getItem("savedData");
              if (response === null) alert("There is no data!");
              else {
                const tmp = [];
                for (const item of JSON.parse(response)) {
                  tmp.push(item);
                }
                setInputDatas(tmp);
              }
            }}
          >
            ブラウザへの保存データから復元
          </button>
          <button
            onClick={() => {
              setShouldDeleteButton(true);
            }}
          >
            参照ボタンを消す
          </button>
        </>
      )}
      {inputDatas.map((inputData, i) => (
        <React.Fragment key={i}>
          {hanziDatas[i] !== undefined && (
            <div className={styles.hanzi}>
              <div className={styles.title}>
                <PinyinComponent pinyin={inputData.pinyin} />
                <TitleHanzi
                  key={i}
                  hanziData={hanziDatas[i]}
                  emphStrokeNumbers={inputData.emphStrokeNumbers}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.info}>
                  <HanziCompoundComponent
                    hanziCompound={inputData.hanziCompound}
                  />
                  <StrokeOrder hanziData={hanziDatas[i]} />
                </div>
                <PlayGround hanziData={hanziDatas[i]} />
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default App;
