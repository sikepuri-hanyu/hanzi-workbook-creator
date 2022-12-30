import { Dispatch, SetStateAction } from "react";
import { InputDatas } from "./hanziData";

export default function getSavedData(
  setInputDatas: Dispatch<SetStateAction<InputDatas>>
) {
  const response = localStorage.getItem("savedBackupData");
  if (response !== null) {
    const tmp = [];
    for (const item of JSON.parse(response)) {
      tmp.push(item);
    }
    setInputDatas(tmp);
  }
}
