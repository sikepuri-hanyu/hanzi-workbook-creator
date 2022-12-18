import React, { useEffect, useState } from "react";
import "./App.css";

type Hanzi = string;
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

type StrokeNumber = number;
type StrokeNumbers = [...StrokeNumber[]];
type Pinyin = string;
type InputData = {
  hanzi: Hanzi;
  pinyin: Pinyin;
  emphStrokeNumbers: StrokeNumbers;
};

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
        className="acjk"
        viewBox="0 0 1024 1024"
        width="100px"
        height="100px"
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
    <>
      {hanziData.strokesData.map((stroke, i) => (
        <svg
          key={`${hanziData.hanziCode}order${i}`}
          className="acjk"
          viewBox="0 0 1024 1024"
          width="50px"
          height="50px"
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
    </>
  );
}

function PlayGround({ hanziData }: { hanziData: HanziData }) {
  return (
    <>
      <div style={{ display: "flex" }}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            style={{
              width: "100px",
              height: "100px",
              border: "solid 4px lightskyblue",
              margin: "6px",
            }}
          >
            {index === 0 && (
              <svg
                key={`playground${hanziData.hanziCode}`}
                className="acjk"
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

function App() {
  const [inputDatas, setInputDatas] = useState<InputData[]>([
    { hanzi: "一", pinyin: "yi1", emphStrokeNumbers: [1] },
    { hanzi: "你", pinyin: "ni3", emphStrokeNumbers: [1, 2] },
  ]);
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
  return (
    <>
      {inputDatas.map((inputData, i) => (
        <React.Fragment key={i}>
          {hanziDatas[i] !== undefined && (
            <>
              <div>{inputData.pinyin}</div>
              <TitleHanzi
                key={i}
                hanziData={hanziDatas[i]}
                emphStrokeNumbers={inputData.emphStrokeNumbers}
              />
              <StrokeOrder hanziData={hanziDatas[i]} />
              <PlayGround hanziData={hanziDatas[i]} />
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default App;
