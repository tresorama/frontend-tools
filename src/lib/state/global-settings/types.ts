import {
  type Preset as CodeEditor_UserPreset,
} from "../../../routes/tools/code-editor/+page.svelte";

export type GlobalSettings = {
  version: 1,
  settings: {
    "code-editor": {
      userPresets: CodeEditor_UserPreset[],
    },
  };
};