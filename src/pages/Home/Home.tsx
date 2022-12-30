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
  Paper,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Table,
  TableRow,
  TableCell,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Button,
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
import PreviewIcon from "@mui/icons-material/Preview";
import CreateIcon from "@mui/icons-material/Create";
import GitHubIcon from "@mui/icons-material/GitHub";

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
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  newData: InputStringData;
  setNewData: Dispatch<SetStateAction<InputStringData>>;
}): JSX.Element {
  return (
    <>
      <IconButton
        aria-label="add"
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
        <CheckIcon />
      </IconButton>
    </>
  );
}

/**
 * input field of hanzi data
 */
function HanziInputField({
  data,
  setData,
}: {
  data: InputStringData;
  setData: Dispatch<SetStateAction<InputStringData>>;
}): JSX.Element {
  return (
    <>
      <TableCell lang="zh-cmn-Hans">
        <TextField
          label="漢字"
          variant="standard"
          value={data.hanzi}
          onChange={(e) => {
            const tmp = { ...data };
            tmp.hanzi = e.target.value;
            tmp.pinyin = pinyin(e.target.value, {
              style: pinyin.STYLE_TONE2,
            }).join("");
            setData(tmp);
          }}
        />
      </TableCell>
      <TableCell lang="zh-cmn-Hans">
        <TextField
          label="ピンイン"
          variant="standard"
          value={data.pinyin}
          onChange={(e) => {
            const tmp = { ...data };
            tmp.pinyin = e.target.value;
            setData(tmp);
          }}
        />
      </TableCell>
      <TableCell lang="zh-cmn-Hans">
        <TextField
          label="強調する画数"
          variant="standard"
          value={data.emphStrokeNumbers}
          onChange={(e) => {
            const tmp = { ...data };
            tmp.emphStrokeNumbers = e.target.value;
            setData(tmp);
          }}
        />
      </TableCell>
      <TableCell lang="zh-cmn-Hans">
        <TextField
          label="熟語"
          variant="standard"
          value={data.hanziCompound}
          onChange={(e) => {
            const tmp = { ...data };
            tmp.hanziCompound = e.target.value;
            setData(tmp);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          label="メモ"
          variant="standard"
          value={data.note}
          onChange={(e) => {
            const tmp = { ...data };
            tmp.note = e.target.value;
            setData(tmp);
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
          <HanziInputField data={edittingData} setData={setEdittingData} />
        </>
      ) : (
        <>
          <HanziOutputField inputData={inputData} />
        </>
      )}
      <TableCell sx={{ minWidth: 200 }}>
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
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  newData: InputStringData;
  setNewData: Dispatch<SetStateAction<InputStringData>>;
}) {
  return (
    <>
      <HanziInputField data={newData} setData={setNewData} />
      <TableCell sx={{ minWidth: 200 }}>
        <AddButton
          inputDatas={inputDatas}
          setInputDatas={setInputDatas}
          newData={newData}
          setNewData={setNewData}
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
}: {
  inputDatas: InputDatas;
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
  edittingNumber: number;
  setEdittingNumber: Dispatch<SetStateAction<number>>;
  edittingData: InputStringData;
  setEdittingData: Dispatch<SetStateAction<InputStringData>>;
  newData: InputStringData;
  setNewData: Dispatch<SetStateAction<InputStringData>>;
}): JSX.Element {
  return (
    <>
      <Table>
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
          />
        </TableRow>
      </Table>
    </>
  );
}

/**
 * save button
 */
function SaveButton({ inputDatas }: { inputDatas: InputDatas }): JSX.Element {
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<SaveIcon />}
        onClick={() => {
          localStorage.setItem("savedData", JSON.stringify(inputDatas));
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
}: {
  setInputDatas: Dispatch<SetStateAction<InputDatas>>;
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
            setInputDatas(tmp);
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
        すべて削除
      </Button>
    </>
  );
}

/**
 * download json file
 */
function FileDownloadButton({
  inputDatas,
}: {
  inputDatas: InputDatas;
}): JSX.Element {
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FileDownloadIcon />}
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
        sx={{ m: 0.5 }}
      >
        ダウンロード
      </Button>
    </>
  );
}

/** app bar
 */
function TopAppBar() {
  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography>漢字練習帳クリエーター</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="github"
            color="inherit"
            href="https://github.com/sikepuri-hanyu/hanzi-workbook-creator"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <TopAppBar />
        <Toolbar />
        <InputFields
          inputDatas={inputDatas}
          setInputDatas={setInputDatas}
          edittingNumber={edittingNumber}
          setEdittingNumber={setEdittingNumber}
          edittingData={edittingData}
          setEdittingData={setEdittingData}
          newData={newData}
          setNewData={setNewData}
        />
        <SaveButton inputDatas={inputDatas} />
        <RestoreButton setInputDatas={setInputDatas} />
        <ClearAllButton setInputDatas={setInputDatas} />
        <FileDownloadButton inputDatas={inputDatas} />
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              href="/"
              label="エディター"
              icon={<CreateIcon />}
            />
            <BottomNavigationAction
              href="/preview"
              label="プレビュー"
              icon={<PreviewIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
}
