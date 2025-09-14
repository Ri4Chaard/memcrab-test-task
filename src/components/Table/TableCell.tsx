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
      className={`${styles.cell} ${isHighlighted ? styles.highlighted : null}`}
      onClick={() => incrementCell(cell.id, cell.id)}
      onMouseEnter={() => highlightNearest(cell)}
      onMouseLeave={clearHighlight}
      style={
        showPercentage
          ? { background: `rgba(0, 150, 255, ${heatmap / 100})` }
          : {}
      }
    >
      {showPercentage ? `${percentage}%` : cell.amount}
    </td>
  );
};
