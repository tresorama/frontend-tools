import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

import type { GlobalSettings } from '../types';
import { INITIAL_STATE } from '../initial-state';
import { createApi } from './api';

import { createReaderLocalStorage } from '../../_utils/reader-local-storage';

// svelte custom store
export const globalSettingsLocal = createStore_GlobalSettingsLocal();


// svelte custom store creator
function createStore_GlobalSettingsLocal() {
  // create svelte state
  const state = writable<GlobalSettings>(INITIAL_STATE);

  // create sync to local storage
  const localStorage_globalSettings = createReaderLocalStorage<GlobalSettings>('global-settings');
  // on load -> read from local storage
  if (browser) {
    const saved = localStorage_globalSettings.read();
    if (saved) state.set(saved);
  }
  // on state chages -> write lo local storage
  state.subscribe(s => {
    if (browser) localStorage_globalSettings.write(s);
  });


  // create the public api used in components
  const api = createApi({
    getState: () => get(state),
    setState: state.set,
  });

  return {
    subscribe: state.subscribe,
    set: state.set,
    update: state.update,
    api,
  };
}


