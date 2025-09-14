import type { Cell } from "../types/table";

export function rowSum(row: Cell[]): number {
  return row.reduce((acc, cell) => acc + cell.amount, 0);
}

export function columnPercentile(
  matrix: Cell[][],
  colIndex: number,
  percentile = 0.6
): number {
  const values = matrix
    .map((row) => row[colIndex]?.amount)
    .filter((v) => v !== undefined);
  const sorted = values.sort((a, b) => a - b);

  const idx = percentile * (sorted.length - 1);
  const lower = sorted[Math.floor(idx)];
  const upper = sorted[Math.ceil(idx)];
  return Number((lower + (upper - lower) * (idx - Math.floor(idx))).toFixed(2));
}

export function rowPercentages(row: Cell[]): number[] {
  const sum = rowSum(row);
  return row.map((cell) => Math.round((cell.amount / sum) * 100));
}

export function rowHeatmap(row: Cell[]): number[] {
  const max = Math.max(...row.map((c) => c.amount));
  return row.map((cell) => Math.round((cell.amount / max) * 100));
}
