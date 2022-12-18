import React, { useEffect, useState } from "react";
import "./App.css";

function getHanziCode(hanzi: string): number | undefined {
  return hanzi[0].codePointAt(0);
}

async function getHanziData(hanzi: string) {
  let result: string[] | undefined = [];
  await fetch(
    `https://raw.githubusercontent.com/parsimonhi/animCJK/master/svgsZhHans/${getHanziCode(
      hanzi
    )}.svg`
  )
    .then(async (response) => await response.text())
    .then((text) => {
      const reg = new RegExp(`id="z${getHanziCode(hanzi)}d.+" d=".*"`, "g");
      result = text
        .match(reg)
        ?.map((char) => char.replace(/id=".*" d=/, "").replaceAll('"', ""));
    });
  return result;
}

function App() {
  const [hoge, setHoge] = useState<string[] | undefined>(["b"]);
  const [hanzis, setHanzis] = useState<string[]>(["一", "丁"]);
  const [hanziDatas, setHanziDatas] = useState<string[][]>([[]]);
  useEffect(() => {
    (async () => {
      const tmp = [];
      for (const hanzi of hanzis) {
        const tmp2 = await getHanziData(hanzi);
        tmp.push(tmp2);
      }
      setHanziDatas(tmp);
    })();
  }, []);
  return (
    <>
      {hanziDatas.map((hanziData) => (
        <svg
          id="z19968"
          className="acjk"
          viewBox="0 0 1024 1024"
          width="100px"
          height="100px"
        >
          {hanziData.map((stroke) => (
            <path id="z19968d1" d={stroke} />
          ))}
        </svg>
      ))}
    </>
  );
}

export default App;
