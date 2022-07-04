import { isString } from './nodash';
import { DefaultOption } from '../types';

export default function getOptionProperty(option: DefaultOption, key: string) {
  if (isString(option)) {
    return undefined;
  }

  return option[key];
}
