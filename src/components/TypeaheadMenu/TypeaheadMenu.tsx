import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

import Highlighter from '../Highlighter';
import Menu, { MenuProps } from '../Menu';
import MenuItem from '../MenuItem';

import { getOptionLabel, getOptionProperty, isString } from '../../utils';
import { LabelKey, DefaultOption } from '../../types';

export type RenderMenuItemChildren<Option extends DefaultOption> = (
  option: Option,
  menuProps: TypeaheadMenuProps<Option>,
  idx: number
) => JSX.Element;

export interface TypeaheadMenuProps<Option extends DefaultOption> extends MenuProps {
  labelKey: LabelKey<Option>;
  newSelectionPrefix?: ReactNode;
  options: Option[];
  paginationText?: ReactNode;
  renderMenuItemChildren: RenderMenuItemChildren<Option>;
  text: string;
}

const propTypes = {
  /**
   * Provides the ability to specify a prefix before the user-entered text to
   * indicate that the selection will be new. No-op unless `allowNew={true}`.
   */
  newSelectionPrefix: PropTypes.node,
  /**
   * Prompt displayed when large data sets are paginated.
   */
  paginationText: PropTypes.node,
  /**
   * Provides a hook for customized rendering of menu item contents.
   */
  renderMenuItemChildren: PropTypes.func,
};

const defaultProps = {
  newSelectionPrefix: 'New selection: ',
  paginationText: 'Display additional results...',
  renderMenuItemChildren: (option: DefaultOption, props: TypeaheadMenuProps<DefaultOption>) => (
    <Highlighter search={props.text}>
      {getOptionLabel(option, props.labelKey)}
    </Highlighter>
  ),
};

const TypeaheadMenu = <Option extends DefaultOption>(props: TypeaheadMenuProps<Option>) => {
  const {
    labelKey,
    newSelectionPrefix,
    options,
    paginationText,
    renderMenuItemChildren,
    ...menuProps
  } = props;

  const renderMenuItem = (option: Option, position: number) => {
    const label = getOptionLabel(option, labelKey);

    const menuItemProps = {
      disabled: !!getOptionProperty(option, 'disabled'),
      label,
      option,
      position,
    };

    if (getOptionProperty(option, 'customOption')) {
      return (
        <MenuItem
          {...menuItemProps}
          className="rbt-menu-custom-option"
          key={position}
          label={label}>
          {newSelectionPrefix}
          <Highlighter search={menuProps.text}>{label}</Highlighter>
        </MenuItem>
      );
    }

    if (getOptionProperty(option, 'paginationOption')) {
      return (
        <React.Fragment key="pagination-option-divider">
          <Menu.Divider />
          <MenuItem
            {...menuItemProps}
            className="rbt-menu-pagination-option"
            label={
              // TODO: Fix how (aria-)labels are passed to `MenuItem`.
              // `paginationText` can be a ReactNode.
              isString(paginationText) ? paginationText : ''
            }>
            {paginationText}
          </MenuItem>
        </React.Fragment>
      );
    }

    return (
      <MenuItem {...menuItemProps} key={position}>
        {renderMenuItemChildren(option, props, position)}
      </MenuItem>
    );
  };

  return <Menu {...menuProps}>{options.map(renderMenuItem)}</Menu>;
};

TypeaheadMenu.propTypes = propTypes;
TypeaheadMenu.defaultProps = defaultProps;

export default TypeaheadMenu;
