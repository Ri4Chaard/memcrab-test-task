import React from "react";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Memcrab 🦀 Test Task</h1>
    </header>
  );
};
