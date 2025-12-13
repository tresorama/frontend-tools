import { writable } from "svelte/store";

import { createApi } from "./api";
import type { GlobalSettingsRemote } from "./types";

// svelte custom store
export const globalSettingsRemote = createStore_GlobalSettingsRemote();

function createStore_GlobalSettingsRemote() {
  // create svelte state
  const state = writable<GlobalSettingsRemote>({
    status: 'idle',
    data: undefined
  });

  // 
  const api = createApi({
    writableStore: state,
  });

  return {
    subscribe: state.subscribe,
    set: state.set,
    update: state.update,
    api,
  };
}

