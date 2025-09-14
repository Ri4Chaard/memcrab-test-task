import React from "react";
import styles from "./Button.module.css";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
};
