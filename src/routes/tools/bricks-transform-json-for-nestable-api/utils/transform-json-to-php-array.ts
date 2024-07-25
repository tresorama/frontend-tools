import Transpiler from 'ast-transpiler';

const transpiler = new Transpiler();

export const transformJsonToPhpArray = (input: string) => {
  const transpiledCode = transpiler.transpilePhp(input);
  return transpiledCode.content;
};