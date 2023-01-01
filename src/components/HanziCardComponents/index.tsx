/**@jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import {
  Hanzi,
  StrokeNumbers,
  Pinyin,
  HanziCompound,
  Note,
  StrokesData,
} from "../hanziData";
import toneConvert from "../pinyinToneConvert";
import getStrokesData, { isHanziExist } from "../getStrokesData";
import { SerializedStyles } from "@emotion/react";

export function TitleHanzi({
  hanzi,
  emphStrokeNumbers,
  style,
}: {
  hanzi: Hanzi;
  emphStrokeNumbers: StrokeNumbers;
  style?: SerializedStyles;
}): JSX.Element {
  const [strokesData, setStrokesData] = useState<StrokesData>([]);
  useEffect(() => {
    (async () => {
      if (await isHanziExist(hanzi))
        setStrokesData(await getStrokesData(hanzi));
    })();
  }, [hanzi]);
  return (
    <>
      <svg key={`${hanzi}`} css={style} viewBox="0 0 1024 1024">
        {strokesData.map((strokeData, j) => (
          <path key={`${hanzi}d${j + 1}`} d={strokeData} fill={"black"} />
        ))}
        {strokesData.map((strokeData, j) => (
          <path
            key={`${hanzi}d${j + 1}`}
            d={strokeData}
            fill={emphStrokeNumbers.includes(j + 1) ? "red" : "none"}
          />
        ))}
      </svg>
    </>
  );
}

export function StrokeOrder({
  hanzi,
  strokeOrderCss,
  strokeOrdersCss,
}: {
  hanzi: Hanzi;
  strokeOrderCss?: SerializedStyles;
  strokeOrdersCss?: SerializedStyles;
}) {
  const [strokesData, setStrokesData] = useState<StrokesData>([]);
  useEffect(() => {
    (async () => {
      if (await isHanziExist(hanzi))
        setStrokesData(await getStrokesData(hanzi));
    })();
  }, [hanzi]);
  return (
    <>
      <div css={strokeOrdersCss}>
        {strokesData.map((_, i) => (
          <svg
            key={`${hanzi}order${i}`}
            css={strokeOrderCss}
            viewBox="0 0 1024 1024"
          >
            {strokesData.map((stroke, j) => (
              <path
                key={`${hanzi}order${i}d${j + 1}`}
                d={stroke}
                fill={"#ccc"}
              />
            ))}
            {strokesData.map((stroke, j) => (
              <path
                key={`${hanzi}order${i}d${j + 1}`}
                d={stroke}
                fill={i > j ? "black" : "none"}
              />
            ))}
            {strokesData.map((stroke, j) => (
              <path
                key={`${hanzi}order${i}d${j + 1}`}
                d={stroke}
                fill={i === j ? "red" : "none"}
              />
            ))}
          </svg>
        ))}
      </div>
    </>
  );
}

export function PlayGround({
  hanzi,
  playgroundCss,
  playgroundsCss,
}: {
  hanzi: Hanzi;
  playgroundCss?: SerializedStyles;
  playgroundsCss?: SerializedStyles;
}) {
  const [strokesData, setStrokesData] = useState<StrokesData>([]);
  useEffect(() => {
    (async () => {
      if (await isHanziExist(hanzi))
        setStrokesData(await getStrokesData(hanzi));
    })();
  }, [hanzi]);
  return (
    <>
      <div css={playgroundsCss}>
        <svg
          key={`playground${hanzi}0`}
          viewBox="0 0 1024 1024"
          css={playgroundCss}
        >
          {strokesData.map((stroke, j) => (
            <path key={`playground${hanzi}d${j + 1}`} d={stroke} fill="#ccc" />
          ))}
        </svg>
        {[1, 2, 3, 4, 5].map((index) => (
          <svg
            key={`playground${hanzi}${index}`}
            viewBox="0 0 1024 1024"
            css={playgroundCss}
          ></svg>
        ))}
      </div>
    </>
  );
}

export function PinyinComponent({
  pinyin,
  style,
}: {
  pinyin: Pinyin;
  style?: SerializedStyles;
}) {
  return (
    <>
      <div lang="zh-cmn-Hans" css={style}>
        {toneConvert(pinyin)}
      </div>
    </>
  );
}

export function NoteComponent({
  note,
  style,
}: {
  note: Note;
  style?: SerializedStyles;
}) {
  return (
    <>
      <div css={style}>{note}</div>
    </>
  );
}

export function HanziCompoundComponent({
  hanziCompound,
  style,
}: {
  hanziCompound: HanziCompound;
  style?: SerializedStyles;
}) {
  return (
    <>
      {hanziCompound !== "" && (
        <div css={style}>
          熟語：<span lang="zh-cmn-Hans">{hanziCompound}</span>
        </div>
      )}
    </>
  );
}
