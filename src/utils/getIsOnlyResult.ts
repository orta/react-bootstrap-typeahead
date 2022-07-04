import getOptionProperty from './getOptionProperty';

import { AllowNew, DefaultOption } from '../types';

interface Props<Option extends DefaultOption> {
  allowNew: AllowNew<Option>;
  highlightOnlyResult: boolean;
  results: DefaultOption[];
}

function getIsOnlyResult<Option extends DefaultOption>(props: Props<Option>): boolean {
  const { allowNew, highlightOnlyResult, results } = props;

  if (!highlightOnlyResult || allowNew) {
    return false;
  }

  return results.length === 1 && !getOptionProperty(results[0], 'disabled');
}

export default getIsOnlyResult;
