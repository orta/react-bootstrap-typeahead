import getOptionLabel from './getOptionLabel';
import { LabelKey, DefaultOption } from '../types';

interface Props<Option extends DefaultOption> {
  activeItem?: Option;
  labelKey: LabelKey<Option>;
  multiple: boolean;
  selected: Option[];
  text: string;
}

function getInputText<Option extends DefaultOption>(props: Props<Option>): string {
  const { activeItem, labelKey, multiple, selected, text } = props;

  if (activeItem) {
    // Display the input value if the pagination item is active.
    return getOptionLabel<Option>(activeItem, labelKey);
  }

  if (!multiple && selected.length && selected[0]) {
    return getOptionLabel(selected[0], labelKey);
  }

  return text;
}

export default getInputText;
