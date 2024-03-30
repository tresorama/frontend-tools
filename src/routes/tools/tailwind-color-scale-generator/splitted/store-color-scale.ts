import { writable } from "svelte/store";
import { generateColorScale } from "../utils/generate-color-scale";

type State = {
  colorName: string;
  inputColor: string;
  inputAt500: boolean;
  createDefault: boolean;
};
type DerivedState = {
  generatedScale: ReturnType<typeof generateColorScale>;
};
type FinalState = null | (State & DerivedState);

export const store_colorScale = (() => {
  const { subscribe, update } = writable<FinalState>(null);

  const setInputs = (state: State) => {
    const {
      colorName,
      inputColor,
      createDefault,
      inputAt500,
    } = state;
    update(() => ({
      // state
      colorName,
      inputColor,
      createDefault,
      inputAt500,
      // derived state
      generatedScale: generateColorScale(inputColor, { createDefault, inputAt500 })
    }));
  };

  return {
    subscribe,
    setInputs,
  };
})();

export const store_generatedScale = (() => {

});