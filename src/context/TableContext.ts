import { createContext, useContext } from "react";
import type { Cell } from "../types/table";

interface TableState {
  matrix: Cell[][];
  x: number;
}

interface TableContextValue extends TableState {
  generateMatrix: (M: number, N: number, X: number) => void;
  incrementCell: (row: number, col: number) => void;
  removeRow: (rowIndex: number) => void;
  addRow: () => void;
  setX: (x: number) => void;
}

const TableContext = createContext<TableContextValue | undefined>(undefined);

const useTable = () => {
  const ctx = useContext(TableContext);
  return ctx;
};

export { TableContext, useTable };
