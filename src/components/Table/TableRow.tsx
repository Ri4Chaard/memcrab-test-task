import React, { useState } from "react";
import type { Cell } from "../../types/table";
import { TableCell } from "./TableCell";
import { rowHeatmap, rowPercentages, rowSum } from "../../utils/math";
import { useTable } from "../../context/TableContext";
import styles from "./TableRow.module.css";
import { Button } from "../ui/Button/Button";

interface Props {
  row: Cell[];
  rowIndex: number;
}

export const TableRow: React.FC<Props> = ({ row, rowIndex }) => {
  const { removeRow } = useTable();
  const [hovered, setHovered] = useState(false);

  const sum = rowSum(row);
  const percentages = rowPercentages(row);
  const heatmap = rowHeatmap(row);

  return (
    <tr>
      <td className={styles.firstCell}>
        {rowIndex + 1}
        <div className={styles.firstCellBg} />
      </td>
      {row.map((cell, i) => (
        <TableCell
          key={cell.id}
          cell={cell}
          showPercentage={hovered}
          percentage={percentages[i]}
          heatmap={heatmap[i]}
        />
      ))}
      <td
        className={styles.sumCell}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {sum}
        <div className={styles.sumCellBg} />
      </td>
      <td>
        <Button onClick={() => removeRow(rowIndex)}>❌</Button>
      </td>
    </tr>
  );
};
