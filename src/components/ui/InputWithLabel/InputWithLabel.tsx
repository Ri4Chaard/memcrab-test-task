import React, { useState } from "react";
import styles from "./InputWithLabel.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
  minValue?: number;
  maxValue?: number;
}

export const InputWithLabel: React.FC<Props> = ({
  inputLabel,
  minValue,
  maxValue,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState<number | null>(
    Number(props.value) || null
  );

  const handleChangeValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let newValue = Number(e.target.value);

    if (minValue !== undefined) {
      newValue = Math.max(minValue, newValue);
    }
    if (maxValue !== undefined) {
      newValue = Math.min(maxValue, newValue);
    }

    setValue(newValue);

    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: String(newValue),
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange?.(syntheticEvent);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={props.id}>
        {inputLabel}
      </label>
      <input
        className={styles.input}
        value={value ?? ""}
        onChange={handleChangeValue}
        type="number"
        {...props}
      />
    </div>
  );
};
