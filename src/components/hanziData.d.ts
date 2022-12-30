type Hanzi = string;
type StrokeNumber = number;
export type StrokeNumbers = [...StrokeNumber[]];
export type Pinyin = string;
export type HanziCompound = string;
export type Note = string;
export type InputData = {
  hanzi: Hanzi;
  pinyin: Pinyin;
  emphStrokeNumbers: StrokeNumbers;
  hanziCompound: HanziCompound;
  note: Note;
};
export type InputDatas = InputData[];
export type InputStringData = {
  hanzi: Hanzi;
  pinyin: Pinyin;
  emphStrokeNumbers: string;
  hanziCompound: HanziCompound;
  note: Note;
};

export type HanziCode = number;
type StrokeData = string;
export type StrokesData = [...StrokeData[]];
export type HanziData = { hanziCode: HanziCode; strokesData: StrokesData };
export type HanziDatas = HanziData[];
