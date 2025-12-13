import { get, writable } from "svelte/store";
import type { TestState } from "./types";
import { INITIAL_STATE } from "./initial-state";
import { createApi } from "./api";

export const storeTest = createStore_test();

function createStore_test() {
  // create svelte state
  const state = writable<TestState>(INITIAL_STATE);

  // 
  const api = createApi({
    getState: () => get(state),
    setState: (newState) => state.set(newState),
  });

  return {
    subscribe: state.subscribe,
    set: state.set,
    api,
  };
}