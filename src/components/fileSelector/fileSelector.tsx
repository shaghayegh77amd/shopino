import { FC, useRef, useState, useEffect } from "react";
import styles from "./fileSelector.module.scss";
import { Files } from "@/shared/type";
import File from "../file/file";
import Folder from "../folder/folder";

const myFile = [
  { id: 1, name: "salam", type: "file" },
  { id: 2, name: "salam2", type: "file" },
  {
    id: 3,
    name: "salam3",
    type: "folder",

    child: [
      { id: 101, name: "by1", type: "file", parentId: 3 },
      { id: 102, name: "by2", type: "file", parentId: 3 },
    ],

    hasChild: true,
  },
];

const FileSelector: FC = () => {
  const [file, setFile] = useState<Files[]>(myFile);
  const [currentFile, setCurrentFile] = useState<Files>();
  const [editFile, setEditFile] = useState(Boolean);
  const [addRootFile, setAddRootFile] = useState(Boolean);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [enableRename, setEnableRename] = useState(Boolean);
  const newFile = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (addRootFile) {
      newFile.current && newFile.current.focus();
    }
  }, [addRootFile]);

  const setCurrent = (item: Files) => {
    setCurrentFile(item);
    setEditFile(false);
  };
  const addFile = (name: string, type: string) => {
    if (currentFile && name === "") {
      setEditFile(true);
    } else {
      setAddRootFile(true);
    }
    if (name !== "") {
      setFile([
        ...file,
        {
          id: file[file.length - 1].id + 1,
          name: name,
          type: type,
        },
      ]);
      setName("");
      setEditFile(false);
      setAddRootFile(false);
      setType("");
    }
  };
  const rename = (currentFile: Files, name: string) => {
    if (currentFile) {
      setFile((prev) => {
        const update = [...prev];
        const index = update.findIndex((item) => item.id === currentFile.id);
        update[index].name = name;
        return update;
      });
      setEnableRename(false);
      setName("");
    }
  };
  const deleteFile = (currentFile: Files) => {
    setFile((prev) => {
      return prev.filter((item) => currentFile.id !== item.id);
    });
  };
  return (
    <div className={styles.fileSelector}>
      <div className={styles.fileSelectorContent}>
        <div className={styles.title}>
          <p>file selector</p>
        </div>
        {/* {console.log(type)} */}
        <div className={styles.buttonRow}>
          <button
            onClick={() => {
              addFile(name, type);
              setType("file");
            }}
          >
            <img src="/images/file.png" alt="" />
          </button>
          <button
            onClick={() => {
              addFile(name, type);
              setType("folder");
            }}
          >
            <img src="/images/folder.png" alt="" />
          </button>
          <button onClick={() => setEnableRename(true)} disabled={!currentFile}>
            <img src="/images/rename.png" alt="" />
          </button>
          <button
            onClick={() => currentFile && deleteFile(currentFile)}
            disabled={!currentFile}
          >
            <img src="/images/delete.png" alt="" />
          </button>
        </div>

        {file &&
          file.map((item) => {
            return (
              <>
                {item.type === "file" ? (
                  <File
                    setCurrent={setCurrent}
                    currentFile={currentFile && currentFile}
                    item={item}
                    editFile={editFile}
                    name={name}
                    setName={setName}
                    addFile={addFile}
                    type={type}
                    enableRename={enableRename}
                    rename={rename}
                    setEnableRename={setEnableRename}
                    key={item.id}
                  />
                ) : (
                  <Folder
                    setCurrent={setCurrent}
                    item={item}
                    currentFile={currentFile && currentFile}
                    items={item.child && item.child}
                    editFile={editFile}
                    name={name}
                    setName={setName}
                    addFile={addFile}
                    type={type}
                    key={item.id}
                    enableRename={enableRename}
                    setEnableRename={setEnableRename}
                    rename={rename}
                  />
                )}
              </>
            );
          })}
        {addRootFile && (
          <>
            <input
              type="text"
              ref={newFile}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => addFile(name, type)}>aaaaaaaaaa</button>
          </>
        )}
      </div>
      <div
        className={styles.empty}
        onClick={() => {
          setCurrentFile(undefined);
        }}
      ></div>
    </div>
  );
};

export default FileSelector;
