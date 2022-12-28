import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import {
  InputData,
  InputDatas,
  InputStringData,
} from "../../components/hanziData";
import pinyin from "pinyin";
import toneConvert from "../../components/pinyinToneConvert";

const initialDatas: InputDatas = [
  {
    hanzi: "你",
    pinyin: "ni3",
    emphStrokeNumbers: [1, 2],
    hanziCompound: "你好",
    note: "sample note",
  },
  {
    hanzi: "好",
    pinyin: "hao3",
    emphStrokeNumbers: [2, 3, 4],
    hanziCompound: "你好",
    note: "sample note",
  },
];

const initialStringData: InputStringData = {
  hanzi: "",
  pinyin: "",
  emphStrokeNumbers: "",
  hanziCompound: "",
  note: "",
};

function Description() {
  return (
    <>
      <p>
        これは、漢字練習帳の自動作成ツールです。使い方は、次のようになります。
      </p>
      <ul>
        <li>下の入力ボックスに必要な情報を入力してください。</li>
        <li>
          プレビューページに移動してください。先程入力したデータを基に漢字練習帳ができているはずです。
        </li>
      </ul>
    </>
  );
}

/**
 * remove button
 * @param inputDatas
 * @param setInputDatas
 * @param index The index of this element
 * @returns
 */
function RemoveButton({
  inputDatas,
  setInputDatas,
  index,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  index: number;
}): JSX.Element {
  return (
    <>
      <button
        onClick={() => {
          setInputDatas(inputDatas.filter((inputData, i) => index !== i));
        }}
      >
        削除
      </button>
    </>
  );
}

/**
 * up button
 * @param inputDatas
 * @param setInputDatas
 * @param index The index of this element
 * @returns
 */
function UpButton({
  inputDatas,
  setInputDatas,
  index,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  index: number;
}): JSX.Element {
  return (
    <>
      {index !== 0 && (
        <button
          onClick={() => {
            const copiedInputDatas = [...inputDatas];
            const tmp = copiedInputDatas[index - 1];
            copiedInputDatas[index - 1] = copiedInputDatas[index];
            copiedInputDatas[index] = tmp;
            setInputDatas(copiedInputDatas);
          }}
        >
          ↑
        </button>
      )}
    </>
  );
}

/**
 * down button
 */
function DownButton({
  inputDatas,
  setInputDatas,
  index,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  index: number;
}): JSX.Element {
  return (
    <>
      {index !== inputDatas.length - 1 && (
        <button
          onClick={() => {
            const copiedInputDatas = [...inputDatas];
            const tmp = copiedInputDatas[index];
            copiedInputDatas[index] = copiedInputDatas[index + 1];
            copiedInputDatas[index + 1] = tmp;
            setInputDatas(copiedInputDatas);
          }}
        >
          ↓
        </button>
      )}
    </>
  );
}

/**
 * add button
 */
function AddButton({
  inputDatas,
  setInputDatas,
  newData,
  setNewData,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  newData: InputStringData;
  setNewData: Dispatch<SetStateAction<InputStringData>>;
}): JSX.Element {
  return (
    <>
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
              note: newData.note,
            },
          ]);
          setNewData({ ...initialStringData });
        }}
      >
        追加
      </button>
    </>
  );
}

function RowItem({
  inputDatas,
  setInputDatas,
  index,
  edittingNumber,
  setEdittingNumber,
  edittingData,
  setEdittingData,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  index: number;
  edittingNumber: number;
  setEdittingNumber: Dispatch<SetStateAction<number>>;
  edittingData: InputStringData;
  setEdittingData: Dispatch<SetStateAction<InputStringData>>;
}) {
  const inputData: InputData = inputDatas[index];
  return (
    <>
      {edittingNumber === index ? (
        Object.keys(edittingData).map((key) => (
          <td key={key}>
            <input
              type="text"
              // @ts-ignore
              value={edittingData[key]}
              onChange={(e) => {
                const tmp = { ...edittingData };
                switch (key) {
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
                  case "note":
                    tmp.note = e.target.value;
                    break;
                }
                setEdittingData(tmp);
              }}
            />
          </td>
        ))
      ) : (
        <>
          <td>{inputData.hanzi}</td>
          <td>{toneConvert(inputData.pinyin)}</td>
          <td>{inputData.emphStrokeNumbers.join(",")}</td>
          <td>{inputData.hanziCompound}</td>
          <td>{inputData.note}</td>
        </>
      )}
      <td>
        <RemoveButton
          inputDatas={inputDatas}
          setInputDatas={setInputDatas}
          index={index}
        />
        {edittingNumber === index ? (
          <button
            onClick={() => {
              const tmp = [...inputDatas];
              tmp[index].hanzi = edittingData.hanzi;
              tmp[index].pinyin = edittingData.pinyin;
              tmp[index].emphStrokeNumbers = edittingData.emphStrokeNumbers
                .split(",")
                .map((item) => Number(item));
              tmp[index].hanziCompound = edittingData.hanziCompound;
              tmp[index].note = edittingData.note;
              setInputDatas(tmp);
              setEdittingNumber(-1);
              setEdittingData({ ...initialStringData });
            }}
          >
            確定
          </button>
        ) : (
          <button
            onClick={() => {
              setEdittingNumber(index);
              setEdittingData({
                hanzi: inputData.hanzi,
                pinyin: inputData.pinyin,
                emphStrokeNumbers: inputData.emphStrokeNumbers.toString(),
                hanziCompound: inputData.hanziCompound,
                note: inputData.note,
              });
            }}
          >
            編集
          </button>
        )}
        <UpButton
          inputDatas={inputDatas}
          setInputDatas={setInputDatas}
          index={index}
        />
        <DownButton
          inputDatas={inputDatas}
          setInputDatas={setInputDatas}
          index={index}
        />
      </td>
    </>
  );
}

function AddRow({
  inputDatas,
  setInputDatas,
  newData,
  setNewData,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  newData: InputStringData;
  setNewData: Dispatch<SetStateAction<InputStringData>>;
}) {
  return (
    <>
      {Object.keys(inputDatas[0]).map((item, i) => (
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
                : item === "hanziCompound"
                ? newData.hanziCompound
                : newData.note
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
                case "note":
                  tmp.note = e.target.value;
              }
              setNewData({
                hanzi: tmp.hanzi,
                pinyin: tmp.pinyin,
                emphStrokeNumbers: tmp.emphStrokeNumbers,
                hanziCompound: tmp.hanziCompound,
                note: tmp.note,
              });
            }}
          />
        </td>
      ))}
      <td>
        <AddButton
          inputDatas={inputDatas}
          setInputDatas={setInputDatas}
          newData={newData}
          setNewData={setNewData}
        />
      </td>
    </>
  );
}

export default function Home() {
  const [inputDatas, setInputDatas] = useState<InputDatas>(
    initialDatas.map((initialData) => ({ ...initialData }))
  );
  const [newData, setNewData] = useState<InputStringData>({
    ...initialStringData,
  });
  const [edittingNumber, setEdittingNumber] = useState<number>(-1);
  const [edittingData, setEdittingData] = useState<InputStringData>({
    ...initialStringData,
  });
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
            <th>メモ</th>
          </tr>
        </thead>
        <tbody lang="zh-cmn-Hans">
          {inputDatas.map((inputData, i) => (
            <tr key={i}>
              <RowItem
                inputDatas={inputDatas}
                setInputDatas={setInputDatas}
                index={i}
                edittingNumber={edittingNumber}
                setEdittingNumber={setEdittingNumber}
                edittingData={edittingData}
                setEdittingData={setEdittingData}
              />
            </tr>
          ))}
          <tr>
            <AddRow
              inputDatas={inputDatas}
              setInputDatas={setInputDatas}
              newData={newData}
              setNewData={setNewData}
            />
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
          setInputDatas([]);
        }}
      >
        データをすべて削除
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
