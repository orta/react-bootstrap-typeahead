import { DefaultOption } from '../types';

/**
 * Truncates the result set based on `maxResults` and returns the new set.
 */
function getTruncatedOptions<Option extends DefaultOption>(options: Option[], maxResults: number): Option[] {
  if (!maxResults || maxResults >= options.length) {
    return options;
  }

  return options.slice(0, maxResults);
}

export default getTruncatedOptions;
