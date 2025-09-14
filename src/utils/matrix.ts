import type { Cell } from "../types/table";

let globalId = 1;

export function createRandomCell(): Cell {
  return {
    id: globalId++,
    amount: Math.floor(100 + Math.random() * 900),
  };
}

export function generateMatrixFn(M: number, N: number): Cell[][] {
  return Array.from({ length: M }, () =>
    Array.from({ length: N }, () => createRandomCell())
  );
}
