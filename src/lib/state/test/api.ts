import type { TestState } from "./types";


export const createApi = ({
  getState,
  setState
}: {
  getState: () => TestState,
  setState: (newTestState: TestState) => void,
}) => {

  const counterSync = {
    actions: {
      increment: () => {
        const newState = getState();
        newState.counterSync.count++;
        setState(newState);
      },
      decrement: () => {
        const newState = getState();
        newState.counterSync.count--;
        setState(newState);
      },
      reset: () => {
        const newState = getState();
        newState.counterSync.count = 0;
        setState(newState);
      }
    }
  };

  const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));
  const counterAsync = {
    actions: {
      increment: async () => {
        await sleep(1000);
        const newState = getState();
        newState.counterAsync.count++;
        setState(newState);
      },
      decrement: async () => {
        await sleep(1000);
        const newState = getState();
        newState.counterAsync.count--;
        setState(newState);
      },
      reset: async () => {
        await sleep(1000);
        const newState = getState();
        newState.counterAsync.count = 0;
        setState(newState);
      }
    }
  };

  return {
    counterSync,
    counterAsync,
  };
};