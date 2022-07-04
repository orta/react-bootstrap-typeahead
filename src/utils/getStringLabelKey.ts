import { DEFAULT_LABELKEY } from '../constants';
import type { DefaultOption, LabelKey } from '../types';

export default function getStringLabelKey<Option extends DefaultOption>(labelKey: LabelKey<Option>): string {
  return typeof labelKey === 'string' ? labelKey : DEFAULT_LABELKEY;
}
