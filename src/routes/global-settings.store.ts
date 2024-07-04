import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';


export type GlobalSettings = {
  version: 1,
  settings: {
  };
};

const localStorage_globalSettings = {
  key: 'global-settings',
  read() {
    const json = localStorage.getItem(this.key);
    if (json) return JSON.parse(json) as GlobalSettings;
    return null;
  },
  write(globalSettings: GlobalSettings) {
    localStorage.setItem(this.key, JSON.stringify(globalSettings));
  },
  delete() {
    localStorage.removeItem(this.key);
  }
};

// svelte custom store creator
function createStore_GlobalSettings() {
  const state = writable<GlobalSettings>({
    version: 1,
    settings: {
    }
  });

  // on load read from local storage
  if (browser) {
    const saved = localStorage_globalSettings.read();
    if (saved) state.set(saved);
  }

  // on state chages write lo local storage
  state.subscribe(s => {
    if (browser) localStorage_globalSettings.write(s);
  });



  return {
    subscribe: state.subscribe,
    set: state.set,
  };
}

// svelte custom store
export const globalSettings = createStore_GlobalSettings();


