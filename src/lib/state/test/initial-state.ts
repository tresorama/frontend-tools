import type { TestState } from "./types";

export const INITIAL_STATE: TestState = {
  counterSync: {
    count: 0,
  },
  counterAsync: {
    count: 0,
  }
};