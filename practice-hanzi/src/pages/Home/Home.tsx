import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InputData } from "../../components/hanziData";
import pinyin from "pinyin";
// @ts-ignore
import toneConvert from "../../components/pinyinToneConvert";

function Description() {
  return (
    <>
      <p>
        これは、漢字練習帳の自動作成ツールです。使い方は、次のようになります。
      </p>
      <ul>
        <li>下の入力ボックスに必要な情報を入力してください。</li>
        <li>ダウンロードボタンから、データをダウンロードしてください。</li>
        <li>
          プレビューページに移動して、先程ダウンロードしたデータを読み込ませてください。
        </li>
      </ul>
    </>
  );
}

export default function Home() {
  const [inputDatas, setInputDatas] = useState<InputData[]>([
    {
      hanzi: "一",
      pinyin: "yi1",
      emphStrokeNumbers: [1],
      hanziCompound: "一次",
    },
    {
      hanzi: "你",
      pinyin: "ni3",
      emphStrokeNumbers: [1, 2],
      hanziCompound: "你好",
    },
  ]);
  const initialData = {
    hanzi: "",
    pinyin: "",
    emphStrokeNumbers: "",
    hanziCompound: "",
  };
  // const [newData, setNewData] = useState<InputData>(initialData);
  const [newData, setNewData] = useState(initialData);
  const [edittingNumber, setEdittingNumber] = useState<number>(-1);
  const [emphTmp, setEmphTemp] = useState<string>("");
  useEffect(() => {
    const response = localStorage.getItem("savedBackupData");
    if (response !== null) {
      const tmp = [];
      for (const item of JSON.parse(response)) {
        tmp.push(item);
      }
      setInputDatas(tmp);
    }
  }, []);
  useEffect(() => {
    const timerId = setInterval(() => {
      localStorage.setItem("savedBackupData", JSON.stringify(inputDatas));
      console.log("hello");
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [inputDatas]);
  return (
    <>
      <Description />
      <table>
        <thead>
          <tr>
            <th>漢字</th>
            <th>ピンイン</th>
            <th>強調する画数</th>
            <th>熟語</th>
          </tr>
        </thead>
        <tbody lang="zh-cmn-Hans">
          {inputDatas.map((inputData, i) => (
            <tr key={i}>
              {edittingNumber === i ? (
                ["hanzi", "pinyin", "emphStrokeNumbers", "hanziCompound"].map(
                  (item) => (
                    <td key={item}>
                      <input
                        type="text"
                        value={
                          item === "hanzi"
                            ? inputDatas[i].hanzi
                            : item === "pinyin"
                            ? inputDatas[i].pinyin
                            : item === "emphStrokeNumbers"
                            ? emphTmp
                            : inputDatas[i].hanziCompound
                        }
                        onChange={(e) => {
                          const tmp = [...inputDatas];
                          switch (item) {
                            case "hanzi":
                              tmp[i].hanzi = e.target.value;
                              tmp[i].pinyin = pinyin(e.target.value, {
                                style: pinyin.STYLE_TONE2,
                              }).join("");
                              break;
                            case "pinyin":
                              tmp[i].pinyin = e.target.value;
                              break;
                            case "emphStrokeNumbers":
                              setEmphTemp(e.target.value);
                              break;
                            case "hanziCompound":
                              tmp[i].hanziCompound = e.target.value;
                              break;
                          }
                          setInputDatas(tmp);
                        }}
                      />
                    </td>
                  )
                )
              ) : (
                <>
                  <td>{inputData.hanzi}</td>
                  <td>{toneConvert(inputData.pinyin)}</td>
                  <td>{inputData.emphStrokeNumbers.join(",")}</td>
                  <td>{inputData.hanziCompound}</td>
                </>
              )}
              <td>
                <button
                  onClick={() => {
                    setInputDatas(inputDatas.filter((inputData, j) => i !== j));
                  }}
                >
                  削除
                </button>
                {edittingNumber === i ? (
                  <button
                    onClick={() => {
                      const tmp = [...inputDatas];
                      tmp[i].emphStrokeNumbers = emphTmp
                        .split(",")
                        .map((item) => Number(item));
                      setEdittingNumber(-1);
                    }}
                  >
                    確定
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEdittingNumber(i);
                      setEmphTemp(inputDatas[i].emphStrokeNumbers.toString());
                    }}
                  >
                    編集
                  </button>
                )}
                {i !== 0 && (
                  <button
                    onClick={() => {
                      const copiedInputDatas = [...inputDatas];
                      const tmp = copiedInputDatas[i - 1];
                      copiedInputDatas[i - 1] = copiedInputDatas[i];
                      copiedInputDatas[i] = tmp;
                      setInputDatas(copiedInputDatas);
                    }}
                  >
                    ↑
                  </button>
                )}
                {i !== inputDatas.length - 1 && (
                  <button
                    onClick={() => {
                      const copiedInputDatas = [...inputDatas];
                      const tmp = copiedInputDatas[i];
                      copiedInputDatas[i] = copiedInputDatas[i + 1];
                      copiedInputDatas[i + 1] = tmp;
                      setInputDatas(copiedInputDatas);
                    }}
                  >
                    ↓
                  </button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            {["hanzi", "pinyin", "emphStrokeNumbers", "hanziCompound"].map(
              (item, i) => (
                <td key={item}>
                  <input
                    type="text"
                    value={
                      item === "hanzi"
                        ? newData.hanzi
                        : item === "pinyin"
                        ? newData.pinyin
                        : item === "emphStrokeNumbers"
                        ? newData.emphStrokeNumbers.toString()
                        : newData.hanziCompound
                    }
                    onChange={(e) => {
                      const tmp = newData;
                      switch (item) {
                        case "hanzi":
                          tmp.hanzi = e.target.value;
                          tmp.pinyin = pinyin(e.target.value, {
                            style: pinyin.STYLE_TONE2,
                          }).join("");
                          break;
                        case "pinyin":
                          tmp.pinyin = e.target.value;
                          break;
                        case "emphStrokeNumbers":
                          tmp.emphStrokeNumbers = e.target.value;
                          break;
                        case "hanziCompound":
                          tmp.hanziCompound = e.target.value;
                          break;
                      }
                      setNewData({
                        hanzi: tmp.hanzi,
                        pinyin: tmp.pinyin,
                        emphStrokeNumbers: tmp.emphStrokeNumbers,
                        hanziCompound: tmp.hanziCompound,
                      });
                    }}
                  />
                </td>
              )
            )}
            <td>
              <button
                onClick={() => {
                  setInputDatas([
                    ...inputDatas,
                    {
                      hanzi: newData.hanzi,
                      pinyin: newData.pinyin,
                      emphStrokeNumbers: newData.emphStrokeNumbers
                        .split(",")
                        .map((item) => Number(item)),
                      hanziCompound: newData.hanziCompound,
                    },
                  ]);
                  setNewData(initialData);
                }}
              >
                確定
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => {
          localStorage.setItem("savedData", JSON.stringify(inputDatas));
        }}
      >
        ブラウザに保存
      </button>
      <button
        onClick={() => {
          const response = localStorage.getItem("savedData");
          if (response === null) alert("There is no data!");
          else {
            const tmp = [];
            for (const item of JSON.parse(response)) {
              tmp.push(item);
            }
            setInputDatas(tmp);
          }
        }}
      >
        保存データから復元
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("savedData");
          localStorage.removeItem("savedBackupData");
        }}
      >
        バックアップデータをすべて削除
      </button>
      <br />
      <button
        onClick={() => {
          const blob = new Blob([JSON.stringify(inputDatas)], {
            type: "application/json",
          });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "hanzi_data.json";
          a.click();
          URL.revokeObjectURL(a.href);
        }}
      >
        ダウンロード
      </button>
      <br />
      <Link to="/preview">プレビューページ</Link>
    </>
  );
}
