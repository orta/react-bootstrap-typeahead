import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  RefCallback,
  SyntheticEvent,
} from 'react';

import { SIZES } from './constants';

export type AllowNew<Opt extends DefaultOption> =
  | boolean
  | ((options: DefaultOption[], state: TypeaheadPropsAndState<Opt>) => boolean);

export type FilterByCallback<Opt extends DefaultOption> = (
  option: Opt,
  state: TypeaheadPropsAndState<Opt>
) => boolean;

export type Id = string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultOption = string | Record<string, any>;

export type OptionHandler<Opt extends DefaultOption> = (option: Opt) => void;

export type LabelKey<Opt extends DefaultOption> = string | ((option: Opt) => string);

export type SelectEvent<T> = MouseEvent<T> | KeyboardEvent<T>;

export type SelectHint = (
  shouldSelectHint: boolean,
  event: KeyboardEvent<HTMLInputElement>
) => boolean;

export type RefElement<T> = T | null;

export type Size = typeof SIZES[number];

export type TypeaheadChildren<Opt extends DefaultOption> =
  | ReactNode
  | ((props: TypeaheadManagerChildProps<Opt>) => ReactNode);

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface TypeaheadInputProps extends InputProps {
  inputClassName?: string;
  inputRef: RefCallback<HTMLInputElement>;
  referenceElementRef: RefCallback<HTMLElement>;
}

export interface RenderTokenProps<Opt extends DefaultOption> {
  disabled?: boolean;
  labelKey: LabelKey<Opt>;
  onRemove?: OptionHandler<Opt>;
  tabIndex?: number;
}

export type RenderToken<Opt extends DefaultOption> = (
  option: Opt,
  props: RenderTokenProps<Opt>,
  idx: number
) => JSX.Element;

export interface TypeaheadProps<Opt extends DefaultOption> {
  allowNew: AllowNew<Opt>;
  autoFocus: boolean;
  caseSensitive: boolean;
  children: TypeaheadChildren<Opt>;
  defaultInputValue: string;
  defaultOpen: boolean;
  defaultSelected: Opt[];
  emptyLabel?: ReactNode;
  filterBy: string[] | FilterByCallback<Opt>;
  highlightOnlyResult: boolean;
  id?: Id;
  ignoreDiacritics: boolean;
  inputProps?: InputProps;
  labelKey: LabelKey<Opt>;
  maxResults: number;
  minLength: number;
  multiple: boolean;
  onBlur: FocusEventHandler<HTMLInputElement>;
  onChange?: (selected: Opt[]) => void;
  onFocus: (event: SyntheticEvent<HTMLInputElement>) => void;
  onInputChange: (text: string, event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onMenuToggle: (isOpen: boolean) => void;
  onPaginate: (event: SelectEvent<HTMLElement>, shownResults: number) => void;
  open?: boolean;
  options: Opt[];
  paginate: boolean;
  selected?: Opt[];
  selectHint?: SelectHint;
}

export interface TypeaheadState<Opts extends DefaultOption> {
  activeIndex: number;
  activeItem?: Opts;
  initialItem?: Opts;
  isFocused: boolean;
  selected: Opts[];
  showMenu: boolean;
  shownResults: number;
  text: string;
}

export type TypeaheadPropsAndState<Opts extends DefaultOption> = Omit<TypeaheadProps<Opts>, 'onChange'> &
  TypeaheadState<Opts>;

export interface TypeaheadManagerChildProps<Opt = DefaultOption> {
  activeIndex: number;
  getInputProps: (props?: InputProps) => TypeaheadInputProps;
  hideMenu: () => void;
  isMenuShown: boolean;
  labelKey: LabelKey<Opt>;
  onClear: () => void;
  onHide: () => void;
  onRemove: OptionHandler<Opt>;
  results: Opt[];
  selected: Opt[];
  text: string;
  toggleMenu: () => void;
}

export interface TypeaheadManagerProps<Opt extends DefaultOption> extends TypeaheadPropsAndState<Opt> {
  hideMenu: () => void;
  inputNode: RefElement<HTMLInputElement>;
  inputRef: RefCallback<HTMLInputElement>;
  isMenuShown: boolean;
  onActiveItemChange: OptionHandler<Opt>;
  onAdd: OptionHandler<Opt>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
  onClick: MouseEventHandler<HTMLInputElement>;
  onHide: () => void;
  onInitialItemChange: (option?: Opt) => void;
  onMenuItemClick: (option: Opt, event: SelectEvent<HTMLElement>) => void;
  onRemove: OptionHandler<Opt>;
  placeholder?: string;
  results: Opt[];
  setItem: (item: Opt, position: number) => void;
  toggleMenu: () => void;
}
