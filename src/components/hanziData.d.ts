type Hanzi = string;
type StrokeNumber = number;
export type StrokeNumbers = [...StrokeNumber[]];
export type Pinyin = string;
export type HanziCompound = string;
export type Note = string;
export type InputData = {
  deckNumber: number;
  hanzi: Hanzi;
  pinyin: Pinyin;
  emphStrokeNumbers: StrokeNumbers;
  hanziCompound: HanziCompound;
  note: Note;
};
export type InputDatas = InputData[];

export type InputStringData = {
  deckNumber: number;
  hanzi: Hanzi;
  pinyin: Pinyin;
  emphStrokeNumbers: string;
  hanziCompound: HanziCompound;
  note: Note;
};

type StrokeData = string;
export type StrokesData = [...StrokeData[]];
