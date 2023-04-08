import { FC, useEffect, useRef, useState } from "react";
import styles from "./file.module.scss";
import { Files } from "@/shared/type";

interface IItemProps {
  setCurrent: Function;
  currentFile?: Files;
  item: Files;
  editFile: boolean;
  name: string;
  setName: Function;
  addFile: Function;
  type: string;
  enableRename: boolean;
  rename: Function;
  setEnableRename: Function;
}

const File: FC<IItemProps> = ({
  currentFile,
  setCurrent,
  item,
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
    if (editFile) {
      newFile.current && newFile.current.focus();
    }
  }, [editFile]);
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
  const selectItem = () => {
    setName("");
    setCurrent(item);
    if (enableRename) {
      setEnableRename(false);
    }
  };
  return (
    <>
      <div
        onClick={selectItem}
        className={`${styles.item} ${
          currentFile && currentFile.id === item.id ? styles.select : ""
        }`}
      >
        <p>
          <img src="/images/file.png" alt="" />
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
          </>
        )}
      </div>
    </>
  );
};

export default File;
