import React from "react";
import { useTable } from "../../context/TableContext";
import { TableRow } from "./TableRow";
import { columnPercentile } from "../../utils/math";
import styles from "./Table.module.css";
import tableRowStyles from "./TableRow.module.css";
import { Button } from "../ui/Button/Button";

export const Table: React.FC = () => {
  const { matrix, addRow } = useTable();

  if (!matrix.length) {
    return (
      <p className={styles.placeholder}>No table yet. Create one above.</p>
    );
  }

  const cols = matrix[0].length;

  return (
    <>
      <div className={styles.tableContainer}>
        <table>
          <thead className={styles.tableHead}>
            <td className={tableRowStyles.firstCell}>
              M\N
              <div className={tableRowStyles.firstCellBg} />
            </td>
            {matrix[0].map((_, colIndex) => (
              <td>{colIndex + 1}</td>
            ))}
            <td className={tableRowStyles.sumCell}>
              Sum
              <div className={tableRowStyles.sumCellBg} />
            </td>
            <td />
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <TableRow key={rowIndex} row={row} rowIndex={rowIndex} />
            ))}
            <tr>
              <td className={tableRowStyles.firstCell}>
                60th percentile
                <div className={tableRowStyles.firstCellBg} />
              </td>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <td key={colIndex}>
                  {columnPercentile(matrix, colIndex, 0.6)}
                </td>
              ))}
              <td className={tableRowStyles.sumCell}>
                <div className={tableRowStyles.sumCellBg} />
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.addButtonContainer}>
        <Button onClick={addRow}>➕ Add row</Button>
      </div>
    </>
  );
};
