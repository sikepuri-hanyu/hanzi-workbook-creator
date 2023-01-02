import { InputDatas } from "./hanziData";

export default function getSavedData(): InputDatas | null {
  const response = localStorage.getItem("savedBackupData");
  if (response !== null) {
    const tmp = [];
    for (const item of JSON.parse(response)) {
      tmp.push(item);
    }
    return tmp;
  }
  return null;
}
