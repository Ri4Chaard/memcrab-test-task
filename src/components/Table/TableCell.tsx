import React from "react";
import type { Cell } from "../../types/table";
import { useTable } from "../../context/TableContext";
import styles from "./TableCell.module.css";

interface Props {
  cell: Cell;
  showPercentage: boolean;
  percentage: number;
  heatmap: number;
}

export const TableCell: React.FC<Props> = ({
  cell,
  showPercentage,
  percentage,
  heatmap,
}) => {
  const { highlightedIds, incrementCell, clearHighlight, highlightNearest } =
    useTable();

  const isHighlighted = highlightedIds.includes(cell.id);

  return (
    <td
      className={`${styles.cell} ${
        showPercentage ? styles.withHeatmap : null
      } ${isHighlighted ? styles.highlighted : null}`}
      onClick={() => incrementCell(cell.id)}
      onMouseEnter={() => highlightNearest(cell)}
      onMouseLeave={clearHighlight}
      style={{ "--heatmap": `${heatmap / 100}` } as React.CSSProperties}
    >
      {showPercentage ? `${percentage}%` : cell.amount}
    </td>
  );
};
