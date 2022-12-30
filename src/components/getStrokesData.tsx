import { Hanzi, StrokesData } from "./hanziData";

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
export default async function getStrokesData(hanzi: Hanzi) {
  const hanziCode = getDecimalUnicode(hanzi);
  let strokesData: StrokesData = [];
  await fetch(
    `https://raw.githubusercontent.com/parsimonhi/animCJK/master/svgsZhHans/${hanziCode}.svg`
  )
    .then(async (response) => await response.text())
    .then((text) => {
      const reg = new RegExp(`id="z${hanziCode}d.+" d=".*"`, "g");
      strokesData = text
        .match(reg)
        ?.map((char) => char.replace(/id=".*" d=/, "").replaceAll('"', ""))!;
    });
  return strokesData;
}
