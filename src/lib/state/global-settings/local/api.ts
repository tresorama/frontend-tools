import { INITIAL_STATE } from "../initial-state";
import type { GlobalSettings } from "../types";

type CodeEditor_UserPreset = GlobalSettings['settings']['code-editor']['userPresets'][number];

export const createApi = ({
  getState,
  setState
}: {
  getState: () => GlobalSettings,
  setState: (globalSettings: GlobalSettings) => void,
}) => {

  // 
  const globalActions = {
    destroyAndRecreate: () => {
      setState(INITIAL_STATE);
    }
  };

  // api for "code-editor" route
  const codeEditor = {
    deleteAllUserPresets() {
      const newState = getState();
      newState.settings['code-editor'].userPresets = [];
      setState(newState);
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
      const newState = getState();
      newState.settings['code-editor'].userPresets = [...newState.settings['code-editor'].userPresets, newPreset];

      setState(newState);

      return newPreset;
    },
  };

  return {
    globalActions,
    codeEditor,
  };
};