import { FC, useEffect, useRef, useState } from "react";
import styles from "./folder.module.scss";
import File from "./../file/file";
import { Files } from "@/shared/type";

interface IItemProps {
  setCurrent: Function;
  item: Files;
  currentFile?: Files;
  items?: Files[];
  editFile: boolean;
  type: string;
  name: string;
  setName: Function;
  addFile: Function;
  enableRename: boolean;
  rename: Function;
  setEnableRename: Function;
}

const Folder: FC<IItemProps> = ({
  currentFile,
  item,
  setCurrent,
  items,
  editFile,
  name,
  setName,
  addFile,
  type,
  enableRename,
  rename,
  setEnableRename,
}) => {
  const newFile = useRef<HTMLInputElement>(null);
  const renameFile = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (enableRename) {
      renameFile.current && renameFile.current.focus();
    }
  }, [enableRename]);
  const keydownHandler = (e: any) => {
    if (e.keyCode === 13 && enableRename) {
      console.log(e.keyCode);
      rename(currentFile, name);
    } else if (e.keyCode === 13 && editFile) {
      console.log(e.keyCode);
      addFile(name, type);
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  });
  useEffect(() => {
    if (editFile) {
      newFile.current && newFile.current.focus();
    }
  }, [editFile]);
  return (
    <div className={`${styles.item} `}>
      <p
        onClick={() => setCurrent(item)}
        className={
          currentFile && currentFile.id === item.id ? styles.select : ""
        }
      >
        <img src="/images/folder.png" alt="" />

        {enableRename && currentFile && currentFile.id === item.id ? (
          <input
            type="text"
            ref={renameFile}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.renameInput}
          />
        ) : (
          <span className={styles.title}>{item.name}</span>
        )}
      </p>
      {editFile && currentFile && currentFile.id === item.id && (
        <>
          <input
            type="text"
            ref={newFile}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => addFile(name)}>aaaaaaaaaa</button>
        </>
      )}
      {items &&
        items.map((item) => {
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
                  key={item.id}
                  type={type}
                  enableRename={enableRename}
                  setEnableRename={setEnableRename}
                  rename={rename}
                />
              )}
            </>
          );
        })}
    </div>
  );
};

export default Folder;
