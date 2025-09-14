import { useState, type ReactNode } from "react";
import type { Cell } from "../types/table";
import { TableContext } from "../context/TableContext";

let globalId = 1;

function createRandomCell(): Cell {
  return {
    id: globalId++,
    amount: Math.floor(100 + Math.random() * 900),
  };
}

function generateMatrixFn(M: number, N: number): Cell[][] {
  return Array.from({ length: M }, () =>
    Array.from({ length: N }, () => createRandomCell())
  );
}

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [x, setX] = useState<number>(5);

  const generateMatrix = (M: number, N: number, X: number) => {
    setMatrix(generateMatrixFn(M, N));
    setX(X);
  };

  const incrementCell = (cellId: number) => {
    setMatrix((prev) =>
      prev.map((r) =>
        r.map((c) => (c.id === cellId ? { ...c, amount: c.amount + 1 } : c))
      )
    );
  };

  const removeRow = (rowIndex: number) => {
    setMatrix((prev) => prev.filter((_, idx) => idx !== rowIndex));
  };

  const addRow = () => {
    setMatrix((prev) => {
      if (prev.length === 0) return prev;
      const N = prev[0].length;
      return [...prev, Array.from({ length: N }, () => createRandomCell())];
    });
  };

  return (
    <TableContext
      value={{
        matrix,
        x,
        generateMatrix,
        incrementCell,
        removeRow,
        addRow,
        setX,
      }}
    >
      {children}
    </TableContext>
  );
};
