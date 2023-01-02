/**@jsxImportSource @emotion/react */
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  InputData,
  InputDatas,
  InputStringData,
} from "../../components/hanziData";
import pinyin from "pinyin";
import toneConvert from "../../components/pinyinToneConvert";
import {
  TextField,
  IconButton,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CssBaseline,
  Button,
  Paper,
  Toolbar,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import RestoreIcon from "@mui/icons-material/Restore";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import getSavedData from "../../components/getSavedData";
import TopAppBar from "../../components/TopAppBar";
import BottomAppBar from "../../components/BottomAppBar";
import { isHanziExist } from "../../components/getStrokesData";
import { css } from "@emotion/react";
import { TitleHanzi } from "../../components/HanziCardComponents";
import { BrowserView, MobileView } from "react-device-detect";
import BrowserHanziCard from "../../components/BrowserHanziCard";

const initialData: InputData = {
  deckNumber: 1,
  hanzi: "你",
  pinyin: "ni3",
  emphStrokeNumbers: [1, 2],
  hanziCompound: "你好",
  note: "sample note",
};

const initialDatas: InputDatas = [
  {
    deckNumber: 1,
    hanzi: "你",
    pinyin: "ni3",
    emphStrokeNumbers: [1, 2],
    hanziCompound: "你好",
    note: "sample note",
  },
  {
    deckNumber: 1,
    hanzi: "好",
    pinyin: "hao3",
    emphStrokeNumbers: [2, 3, 4],
    hanziCompound: "你好",
    note: "sample note",
  },
];

const initialStringData: InputStringData = {
  deckNumber: 1,
  hanzi: "",
  pinyin: "",
  emphStrokeNumbers: "",
  hanziCompound: "",
  note: "",
};

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
      <IconButton
        aria-label="delete"
        onClick={() => {
          setInputDatas(inputDatas.filter((inputData, i) => index !== i));
        }}
      >
        <DeleteIcon />
      </IconButton>
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
        <IconButton
          aria-label="move up"
          onClick={() => {
            const copiedInputDatas = [...inputDatas];
            const tmp = copiedInputDatas[index - 1];
            copiedInputDatas[index - 1] = copiedInputDatas[index];
            copiedInputDatas[index] = tmp;
            setInputDatas(copiedInputDatas);
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
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
        <IconButton
          aria-label="move down"
          onClick={() => {
            const copiedInputDatas = [...inputDatas];
            const tmp = copiedInputDatas[index];
            copiedInputDatas[index] = copiedInputDatas[index + 1];
            copiedInputDatas[index + 1] = tmp;
            setInputDatas(copiedInputDatas);
          }}
        >
          <ArrowDownwardIcon />
        </IconButton>
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
  deckNumber,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  newData: InputStringData;
  setNewData: Dispatch<SetStateAction<InputStringData>>;
  deckNumber: number;
}): JSX.Element {
  return (
    <>
      <IconButton
        aria-label="add"
        onClick={() => {
          setInputDatas([
            ...inputDatas,
            {
              deckNumber: deckNumber,
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
        <AddIcon />
      </IconButton>
    </>
  );
}

/**
 * edit button
 */
function EditButton({
  inputData,
  setEdittingNumber,
  setEdittingData,
  index,
}: {
  inputData: InputData;
  setEdittingNumber: Dispatch<SetStateAction<number>>;
  setEdittingData: Dispatch<SetStateAction<InputStringData>>;
  index: number;
}): JSX.Element {
  return (
    <>
      <IconButton
        aria-label="edit"
        onClick={() => {
          setEdittingNumber(index);
          setEdittingData({
            deckNumber: inputData.deckNumber,
            hanzi: inputData.hanzi,
            pinyin: inputData.pinyin,
            emphStrokeNumbers: inputData.emphStrokeNumbers.toString(),
            hanziCompound: inputData.hanziCompound,
            note: inputData.note,
          });
        }}
      >
        <EditIcon />
      </IconButton>
    </>
  );
}

/**
 * convert InputStringData to InputData
 * @param inputStringData InputStringData
 * @returns InputData
 */
function toInputData(inputStringData: InputStringData): InputData {
  return {
    deckNumber: inputStringData.deckNumber,
    hanzi: inputStringData.hanzi,
    pinyin: inputStringData.pinyin,
    emphStrokeNumbers: inputStringData.emphStrokeNumbers
      .split(",")
      .map((item) => Number(item)),
    hanziCompound: inputStringData.hanziCompound,
    note: inputStringData.note,
  };
}

/**
 * confirm button
 */
function ConfirmButton({
  inputDatas,
  setInputDatas,
  edittingData,
  setEdittingData,
  setEdittingNumber,
  index,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  edittingData: InputStringData;
  setEdittingData: Dispatch<SetStateAction<InputStringData>>;
  setEdittingNumber: Dispatch<SetStateAction<number>>;
  index: number;
}) {
  return (
    <>
      <IconButton
        aria-label="confirm"
        onClick={() => {
          const tmp = [...inputDatas];
          tmp[index] = toInputData(edittingData);
          setInputDatas(tmp);
          setEdittingNumber(-1);
          setEdittingData({ ...initialStringData });
        }}
      >
        <CheckIcon />
      </IconButton>
    </>
  );
}

/**
 * input field of hanzi data
 */
function HanziInputField({
  inputStringData,
  setInputStringData,
}: {
  inputStringData: InputStringData;
  setInputStringData: Dispatch<SetStateAction<InputStringData>>;
}): JSX.Element {
  return (
    <>
      <TableCell lang="zh-cmn-Hans">
        <TextField
          label="漢字"
          variant="standard"
          value={inputStringData.hanzi}
          onChange={(e) => {
            const tmp = { ...inputStringData };
            tmp.hanzi = e.target.value;
            tmp.pinyin = pinyin(e.target.value, {
              style: pinyin.STYLE_TONE2,
            }).join("");
            setInputStringData(tmp);
          }}
        />
      </TableCell>
      <TableCell lang="zh-cmn-Hans">
        <TextField
          label="ピンイン"
          variant="standard"
          value={inputStringData.pinyin}
          onChange={(e) => {
            const tmp = { ...inputStringData };
            tmp.pinyin = e.target.value;
            setInputStringData(tmp);
          }}
        />
      </TableCell>
      <TableCell lang="zh-cmn-Hans">
        <TextField
          label="強調する画数"
          variant="standard"
          value={inputStringData.emphStrokeNumbers}
          onChange={(e) => {
            const tmp = { ...inputStringData };
            tmp.emphStrokeNumbers = e.target.value;
            setInputStringData(tmp);
          }}
        />
      </TableCell>
      <TableCell lang="zh-cmn-Hans">
        <TextField
          label="熟語"
          variant="standard"
          value={inputStringData.hanziCompound}
          onChange={(e) => {
            const tmp = { ...inputStringData };
            tmp.hanziCompound = e.target.value;
            setInputStringData(tmp);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="メモ"
          variant="standard"
          value={inputStringData.note}
          onChange={(e) => {
            const tmp = { ...inputStringData };
            tmp.note = e.target.value;
            setInputStringData(tmp);
          }}
        />
      </TableCell>
    </>
  );
}

/**
 * output field of hanzi data
 */
function HanziOutputField({
  inputData,
}: {
  inputData: InputData;
}): JSX.Element {
  return (
    <>
      <TableCell lang="zh-cmn-Hans">{inputData.hanzi}</TableCell>
      <TableCell lang="zh-cmn-Hans">{toneConvert(inputData.pinyin)}</TableCell>
      <TableCell lang="zh-cmn-Hans">
        {inputData.emphStrokeNumbers.join(",")}
      </TableCell>
      <TableCell lang="zh-cmn-Hans">{inputData.hanziCompound}</TableCell>
      <TableCell>{inputData.note}</TableCell>
    </>
  );
}

/**
 * row of input fields
 */
function Row({
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
        <>
          <HanziInputField
            inputStringData={edittingData}
            setInputStringData={setEdittingData}
          />
        </>
      ) : (
        <>
          <HanziOutputField inputData={inputData} />
        </>
      )}
      <TableCell>
        {edittingNumber === index ? (
          <ConfirmButton
            inputDatas={inputDatas}
            setInputDatas={setInputDatas}
            edittingData={edittingData}
            setEdittingData={setEdittingData}
            setEdittingNumber={setEdittingNumber}
            index={index}
          />
        ) : (
          <EditButton
            inputData={inputData}
            setEdittingNumber={setEdittingNumber}
            setEdittingData={setEdittingData}
            index={index}
          />
        )}
        <RemoveButton
          inputDatas={inputDatas}
          setInputDatas={setInputDatas}
          index={index}
        />
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
      </TableCell>
    </>
  );
}

/**
 * row of add button
 */
function AddRow({
  inputDatas,
  setInputDatas,
  newData,
  setNewData,
  deckNumber,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  newData: InputStringData;
  setNewData: Dispatch<SetStateAction<InputStringData>>;
  deckNumber: number;
}) {
  return (
    <>
      <HanziInputField
        inputStringData={newData}
        setInputStringData={setNewData}
      />
      <TableCell sx={{ minWidth: 200 }}>
        <AddButton
          inputDatas={inputDatas}
          setInputDatas={setInputDatas}
          newData={newData}
          setNewData={setNewData}
          deckNumber={deckNumber}
        />
      </TableCell>
    </>
  );
}

/**
 * input fields
 */
function InputFields({
  inputDatas,
  setInputDatas,
  edittingNumber,
  setEdittingNumber,
  edittingData,
  setEdittingData,
  newData,
  setNewData,
  deckNumber,
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  edittingNumber: number;
  setEdittingNumber: Dispatch<SetStateAction<number>>;
  edittingData: InputStringData;
  setEdittingData: Dispatch<SetStateAction<InputStringData>>;
  newData: InputStringData;
  setNewData: Dispatch<SetStateAction<InputStringData>>;
  deckNumber: number;
}): JSX.Element {
  return (
    <>
      <Table>
        <TableBody>
          {inputDatas.map((inputData, i) => (
            <TableRow key={i}>
              <Row
                inputDatas={inputDatas}
                setInputDatas={setInputDatas}
                index={i}
                edittingNumber={edittingNumber}
                setEdittingNumber={setEdittingNumber}
                edittingData={edittingData}
                setEdittingData={setEdittingData}
              />
            </TableRow>
          ))}
          <TableRow>
            <AddRow
              inputDatas={inputDatas}
              setInputDatas={setInputDatas}
              newData={newData}
              setNewData={setNewData}
              deckNumber={deckNumber}
            />
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

/**
 * save button
 */
function SaveButton(): JSX.Element {
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<SaveIcon />}
        onClick={() => {
          const response = getSavedData();
          if (response !== null)
            localStorage.setItem("savedData", JSON.stringify(response));
        }}
        sx={{ m: 0.5 }}
      >
        保存
      </Button>
    </>
  );
}

/**
 * restore button
 */
function RestoreButton({
  setInputDatas,
  deckNumber,
}: {
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  deckNumber: number;
}): JSX.Element {
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<RestoreIcon />}
        onClick={() => {
          const response = localStorage.getItem("savedData");
          if (response === null) alert("There is no saved data!");
          else {
            const tmp = [];
            for (const item of JSON.parse(response)) {
              tmp.push(item);
            }
            saveData(tmp);
            setInputDatas(tmp.filter((item) => item.deckNumber === deckNumber));
          }
        }}
        sx={{ m: 0.5 }}
      >
        復元
      </Button>
    </>
  );
}

/**
 * clear all button
 */
function ClearAllButton({
  setInputDatas,
}: {
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
}): JSX.Element {
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ClearAllIcon />}
        onClick={() => {
          localStorage.removeItem("savedData");
          localStorage.removeItem("savedBackupData");
          setInputDatas([]);
        }}
        sx={{ m: 0.5 }}
      >
        保存データを削除
      </Button>
    </>
  );
}

/**
 * download json file
 */
function FileDownloadButton(): JSX.Element {
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FileDownloadIcon />}
        onClick={() => {
          const savedData = getSavedData();
          if (savedData === null) {
            alert("No data!");
          } else {
            const blob = new Blob([JSON.stringify(savedData)], {
              type: "application/json",
            });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "hanzi_data.json";
            a.click();
            URL.revokeObjectURL(a.href);
          }
        }}
        sx={{ m: 0.5 }}
      >
        ダウンロード
      </Button>
    </>
  );
}

/**
 * upload json file
 */
function FileUploadButton({
  setInputDatas,
  deckNumber,
}: {
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  deckNumber: number;
}) {
  return (
    <>
      <Button
        variant="outlined"
        component="label"
        startIcon={<FileUploadIcon />}
        sx={{ m: 0.5 }}
      >
        アップロード
        <input
          type="file"
          accept="json"
          hidden
          onChange={async (e) => {
            if (e.target.files !== null) {
              const reader = new FileReader();
              const file = e.target.files[0];
              reader.readAsText(file, "utf-8");
              reader.onload = () => {
                const inputDatas: InputDatas = JSON.parse(
                  reader.result as string
                );
                saveData(inputDatas);
                setInputDatas(
                  inputDatas.filter(
                    (inputData) => inputData.deckNumber === deckNumber
                  )
                );
              };
            }
          }}
        />
      </Button>
    </>
  );
}

/**
 * UtilButtons
 */
function UtilButtons({
  setInputDatas,
  deckNumber,
}: {
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  deckNumber: number;
}) {
  return (
    <>
      <SaveButton />
      <RestoreButton setInputDatas={setInputDatas} deckNumber={deckNumber} />
      <ClearAllButton setInputDatas={setInputDatas} />
      <FileDownloadButton />
      <FileUploadButton setInputDatas={setInputDatas} deckNumber={deckNumber} />
    </>
  );
}

function saveData(inputDatas: InputDatas) {
  localStorage.setItem("savedBackupData", JSON.stringify(inputDatas));
}

const titleHanzi = css`
  width: 20vw;
  aspect-ratio: 1/1;
  border: solid 1vw lightskyblue;
  margin: 2vw 0;
`;

function MobileHanziCard({ inputData }: { inputData: InputData }) {
  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <TitleHanzi
          hanzi={inputData.hanzi}
          emphStrokeNumbers={inputData.emphStrokeNumbers}
          style={titleHanzi}
        />
      </div>
    </>
  );
}

/**
 * preview hanzi in realtime
 */
function RealtimePreview({
  edittingNumber,
  newData,
  edittingData,
}: {
  edittingNumber: number;
  newData: InputStringData;
  edittingData: InputStringData;
}) {
  const [inputData, setInputData] = useState<InputData>(initialData);
  useEffect(() => {
    (async () => {
      const inputStringData = edittingNumber === -1 ? newData : edittingData;
      if (await isHanziExist(inputStringData.hanzi)) {
        setInputData(toInputData(inputStringData));
      }
    })();
  }, [edittingNumber, newData, edittingData]);
  return (
    <>
      <Paper
        sx={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 1000 }}
        elevation={1}
      >
        <Toolbar />
        <MobileView>
          <MobileHanziCard inputData={inputData} />
        </MobileView>
        <BrowserView>
          <BrowserHanziCard inputData={inputData} />
        </BrowserView>
      </Paper>
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
  const [didGetSavedData, setDidGetSavedData] = useState<boolean>(false);
  useEffect(() => {
    const savedData = getSavedData();
    if (savedData !== null)
      setInputDatas(
        savedData.filter((inputData) => inputData.deckNumber === deckNumber)
      );
    setDidGetSavedData(true);
    const response = localStorage.getItem("deckNumber");
    if (response !== null) {
      setDeckNumber(JSON.parse(response));
    }
  }, []);
  const [deckNumber, setDeckNumber] = useState<number>(1);
  useEffect(() => {
    let response = getSavedData();
    if (response === null) response = [];
    if (didGetSavedData) {
      saveData([
        ...response.filter((inputData) => inputData.deckNumber !== deckNumber),
        ...inputDatas,
      ]);
    }
  }, [inputDatas, didGetSavedData, deckNumber]);
  useEffect(() => {
    localStorage.setItem("deckNumber", JSON.stringify(deckNumber));
  }, [deckNumber]);
  return (
    <>
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <TopAppBar />
        <RealtimePreview
          edittingNumber={edittingNumber}
          newData={newData}
          edittingData={edittingData}
        />
        <InputLabel>セクション番号</InputLabel>
        <Select
          value={deckNumber}
          onChange={(e) => {
            const response = localStorage.getItem("savedBackupData");
            const savedData: InputDatas =
              response === null ? [] : JSON.parse(response);
            setInputDatas(
              savedData.filter(
                (item) => item.deckNumber === Number(e.target.value)
              )
            );
            setDeckNumber(Number(e.target.value));
          }}
        >
          {[...Array(21)].map((_, i) => (
            <MenuItem value={i + 1}>{i + 1}</MenuItem>
          ))}
        </Select>
        <InputFields
          inputDatas={inputDatas}
          setInputDatas={setInputDatas}
          edittingNumber={edittingNumber}
          setEdittingNumber={setEdittingNumber}
          edittingData={edittingData}
          setEdittingData={setEdittingData}
          newData={newData}
          setNewData={setNewData}
          deckNumber={deckNumber}
        />
        <UtilButtons setInputDatas={setInputDatas} deckNumber={deckNumber} />
        <BottomAppBar />
      </Box>
    </>
  );
}
