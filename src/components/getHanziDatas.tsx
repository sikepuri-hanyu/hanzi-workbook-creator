import React, { Dispatch, SetStateAction } from "react";
import {
  InputDatas,
  HanziCode,
  StrokesData,
  HanziData,
  HanziDatas,
} from "./hanziData";

/**
 * convert character to decimal unicode
 */
function getDecimalUnicode(character: string): number | undefined {
  return character[0].codePointAt(0);
}

/**
 * get strokes data
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

/**
 * get hanzi strokes data
 * @param inputDatas
 * @param setHanziDatas
 */
export default async function getHanziDatas(
  inputDatas: InputDatas,
  setHanziDatas: Dispatch<SetStateAction<HanziDatas>>
) {
  const tmp = [];
  for (const inputData of inputDatas) {
    tmp.push(await getStrokesData(getDecimalUnicode(inputData.hanzi)!));
  }
  setHanziDatas(tmp);
}
