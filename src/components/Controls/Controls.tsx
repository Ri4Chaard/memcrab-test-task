import React, { useState } from "react";
import styles from "./Controls.module.css";
import { InputWithLabel } from "../ui/InputWithLabel/InputWithLabel";
import { Button } from "../ui/Button/Button";
import { useTable } from "../../context/TableContext";

export const Controls: React.FC = () => {
  const [userInput, setUserInput] = useState({
    inputM: 0,
    inputN: 0,
    inputX: 0,
  });

  const { matrix, generateMatrix } = useTable();

  console.log(matrix);

  const maxXValue =
    userInput.inputM > 0 && userInput.inputN > 0
      ? userInput.inputM * userInput.inputN - 1
      : 0;

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateMatrix(userInput.inputM, userInput.inputN, userInput.inputX);
  };

  return (
    <form className={styles.container} onSubmit={submitForm}>
      <InputWithLabel
        id="inputM"
        inputLabel="Number M"
        type="number"
        minValue={0}
        maxValue={100}
        placeholder="Type M: range from 0 to 100"
        onChange={(e) =>
          setUserInput((prev) => {
            return { ...prev, inputM: Number(e.target.value) };
          })
        }
        required
      />
      <InputWithLabel
        id="inputN"
        inputLabel="Number N"
        type="number"
        minValue={0}
        maxValue={100}
        placeholder="Type N: range from 0 to 100"
        onChange={(e) =>
          setUserInput((prev) => {
            return { ...prev, inputN: Number(e.target.value) };
          })
        }
        required
      />
      <InputWithLabel
        id="inputX"
        inputLabel="Number X"
        type="number"
        minValue={0}
        maxValue={maxXValue}
        placeholder={
          maxXValue
            ? `Type X: range from 0 to ${maxXValue}`
            : "Type M and N first"
        }
        onChange={(e) =>
          setUserInput((prev) => {
            return { ...prev, inputX: Number(e.target.value) };
          })
        }
        required
      />
      <Button>Create table</Button>
    </form>
  );
};
