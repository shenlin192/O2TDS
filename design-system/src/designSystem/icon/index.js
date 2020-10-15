import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { DM_BOARD_TYPES } from 'Constants';
import { domPropTypes } from '../defaultPropTypes';

const Icon = (props) => {
  const { className, icon, ...rest } = props;

  // if (DM_BOARD_TYPES.includes(icon)) {
  //   const BoardIcon = lazy(() => import(/* webpackChunkName: "Icon" */ `./components/${icon}`));
  //   return (
  //     <span className={classNames('board-icon-wrapper', className)} {...rest}>
  //       <Suspense fallback={<div />}>
  //         <BoardIcon />
  //       </Suspense>
  //     </span>
  //   );
  // }
  return <i className={`icon icon-${icon} ${className}`} {...rest} />;
};

Icon.propTypes = {
  ...domPropTypes,
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
