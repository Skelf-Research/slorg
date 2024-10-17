import { encoding_for_model } from 'tiktoken';

export function countTokens(text, model = 'gpt-3.5-turbo-16k') {
  const encoder = encoding_for_model(model);
  const tokens = encoder.encode(text);
  encoder.free();
  return tokens.length;
}