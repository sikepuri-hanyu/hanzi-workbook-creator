import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputData } from "../../components/hanziData";

function Description() {
  return (
    <>
      <p>
        これは、漢字練習帳の自動作成ツールです。使い方は、次のようになります。
      </p>
      <ul>
        <li>
          下の入力ボックスに必要な情報を入力してください。※現在はリロードすると、データが消えるのでこまめにデータをダウンロードしてください。
        </li>
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
  const initialData: InputData = {
    hanzi: "",
    pinyin: "",
    emphStrokeNumbers: [],
    hanziCompound: "",
  };
  const [newData, setNewData] = useState<InputData>(initialData);
  const [edittingNumber, setEdittingNumber] = useState<number>(-1);
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
                            ? inputDatas[i].emphStrokeNumbers.toString()
                            : inputDatas[i].hanziCompound
                        }
                        onChange={(e) => {
                          const tmp = [...inputDatas];
                          switch (item) {
                            case "hanzi":
                              tmp[i].hanzi = e.target.value;
                              break;
                            case "pinyin":
                              tmp[i].pinyin = e.target.value;
                              break;
                            case "emphStrokeNumbers":
                              tmp[i].emphStrokeNumbers = [];
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
                  <td>{inputData.pinyin}</td>
                  <td>{inputData.emphStrokeNumbers}</td>
                  <td>{inputData.hanziCompound}</td>
                </>
              )}
              <td>
                {edittingNumber === i ? (
                  <button
                    onClick={() => {
                      setEdittingNumber(-1);
                    }}
                  >
                    確定
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEdittingNumber(i);
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
                          break;
                        case "pinyin":
                          tmp.pinyin = e.target.value;
                          break;
                        case "emphStrokeNumbers":
                          tmp.emphStrokeNumbers = [];
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
                  setInputDatas([...inputDatas, newData]);
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
