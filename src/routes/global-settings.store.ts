import { writable, get } from 'svelte/store';

export type GlobalSettings = {
  version: 1,
  settings: {
  };
};


// svelte custom store creator
function createStore_GlobalSettings() {
  const state = writable<GlobalSettings>({
    version: 1,
    settings: {
    }
  });




  return {
    subscribe: state.subscribe,
    set: state.set,
  };
}

// svelte custom store
export const globalSettings = createStore_GlobalSettings();


