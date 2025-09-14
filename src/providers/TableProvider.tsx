import { useState, type ReactNode } from "react";
import type { Cell } from "../types/table";
import { TableContext } from "../context/TableContext";
import { createRandomCell, generateMatrixFn } from "../utils/matrix";

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [matrix, setMatrix] = useState<Cell[][]>([]);
  const [x, setX] = useState<number>(5);
  const [highlightedIds, setHighlightedIds] = useState<number[]>([]);

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

  const highlightNearest = (cell: Cell) => {
    const allCells = matrix.flat();
    const sorted = allCells
      .filter((c) => c.id !== cell.id)
      .map((c) => ({ id: c.id, diff: Math.abs(c.amount - cell.amount) }))
      .sort((a, b) => a.diff - b.diff)
      .slice(0, x)
      .map((c) => c.id);

    setHighlightedIds(sorted);
  };

  const clearHighlight = () => {
    setHighlightedIds([]);
  };

  return (
    <TableContext
      value={{
        matrix,
        x,
        highlightedIds,
        generateMatrix,
        incrementCell,
        removeRow,
        addRow,
        setX,
        highlightNearest,
        clearHighlight,
      }}
    >
      {children}
    </TableContext>
  );
};
