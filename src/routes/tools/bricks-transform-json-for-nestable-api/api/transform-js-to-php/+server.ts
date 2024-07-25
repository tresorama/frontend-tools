import { json } from '@sveltejs/kit';
import { transformJsonToPhpArray } from '../../utils/transform-json-to-php-array';

export async function POST({ request }) {
  // TODO: error handling
  const { inputCode } = await request.json();
  const returnValue = {
    inputCode,
    outputCode: transformJsonToPhpArray(inputCode)
  };
  return json(returnValue, { status: 200 });
}