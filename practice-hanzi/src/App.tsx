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
type InputData = { hanzi: Hanzi; emphStrokeNumbers: StrokeNumbers };

function App() {
  const [inputDatas, setInputDatas] = useState<InputData[]>([
    { hanzi: "一", emphStrokeNumbers: [1] },
    { hanzi: "你", emphStrokeNumbers: [1, 2] },
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
      {hanziDatas.map((hanziData, i) => (
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
              fill={
                inputDatas[i].emphStrokeNumbers.includes(j + 1)
                  ? "red"
                  : "black"
              }
            />
          ))}
        </svg>
      ))}
    </>
  );
}

export default App;
