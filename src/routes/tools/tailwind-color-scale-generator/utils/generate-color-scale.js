/* eslint-disable @typescript-eslint/no-var-requires */

// `shadesOf` always position your input color at grade 500 of the scale
import shadesOf from 'tailwind-shades';
// `tailwindcssPaletteGenerator` calculate which grade your input color is based on lightness
// import { tailwindcssPaletteGenerator } from '@bobthered/tailwindcss-palette-generator';
import { tailwindcssPaletteGenerator } from 'tailwindcss-palette-generator';

/**
 * Generate a Tailwind color scale (50-950) given a single `inputColor`
 * @param {string} inputColor - CSS color string. Color Names are not supported
 * @param {{
 * inputAt500?: boolean,
 * createDefault?:boolean,
 * }} options
 * @returns {{
 *   [key:number]: string,
 *   DEFAULT?: string
 * }}
 */
export const generateColorScale = (
  inputColor,
  { inputAt500 = true, createDefault = false },
) => {
  const scale = inputAt500 ? shadesOf(inputColor) : tailwindcssPaletteGenerator(inputColor).primary;
  return {
    ...scale,
    ...(createDefault && {
      DEFAULT: scale['500']
    })
  };
};
