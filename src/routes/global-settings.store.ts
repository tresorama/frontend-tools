import { writable, get } from 'svelte/store';
import {
  type Preset as CodeEditor_UserPreset,
} from "./tools/code-editor/+page.svelte";
import { browser } from '$app/environment';


export type GlobalSettings = {
  version: 1,
  settings: {
    "code-editor": {
      userPresets: CodeEditor_UserPreset[],
    },
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
      "code-editor": {
        userPresets: [],
      },
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

  // api for "code-editor" route
  const codeEditor = {
    deleteAllUserPresets() {
      const newState = get(state);
      newState.settings['code-editor'].userPresets = [];

      state.set(newState);
    },
    createUserPreset(data: {
      name: string,
      code: string,
      language: string,
    }) {
      // create new user preset
      const newPreset: CodeEditor_UserPreset = {
        id: crypto.randomUUID(),
        ...data,
      };
      // save new user preset
      const newState = get(state);
      newState.settings['code-editor'].userPresets = [...newState.settings['code-editor'].userPresets, newPreset];

      state.set(newState);

      return newPreset;
    },
  };



  return {
    subscribe: state.subscribe,
    set: state.set,
    codeEditor,
  };
}

// svelte custom store
export const globalSettings = createStore_GlobalSettings();


