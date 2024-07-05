import generateCSSVariables from 'css-vars-from-json';

export function convertJsToCssVariables(sourceValue: string) {
  try {
    const input = JSON.parse(JSON.stringify(sourceValue));
    const out = generateCSSVariables(input);
    return `:root {\n${out.replaceAll(';', ';\n')} \n}`;
  } catch (error) {
    return 'error';
  }
}