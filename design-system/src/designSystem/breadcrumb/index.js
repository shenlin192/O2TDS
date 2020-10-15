import React from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';

import './style.less';

const MAX_TITLE_LENGTH = 40;

const Breadcrumb = ({ values }) => {
  const isTruncated = (title) => title.length > MAX_TITLE_LENGTH;

  const getTitle = (value) => {
    const { title, authorized } = value;
    let result = title;

    if (authorized === false) {
      result = `[${intl.get('OBJECT_UNAVAILABLE') || 'object unavailable'}]`;
    } else if (!title) {
      result = `[${intl.get('OBJECT_UNTITLED') || 'untitled'}]`;
    } else if (isTruncated(title)) {
      result = `${title.substring(0, MAX_TITLE_LENGTH)}...`;
    }

    return result;
  };

  return (
    <div className="ds-breadcrumb">
      {values.map((value) => {
        const { uri, icon } = value;

        return (
          <div className="breadcrumb-item" key={uri}>
            <div className="breadcrumb-icon">{icon}</div>
            <a className="breadcrumb-link" href={uri}>
              {getTitle(value)}
            </a>
          </div>
        );
      })}
    </div>
  );
};

Breadcrumb.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uri: PropTypes.string,
      icon: PropTypes.node,
      authorized: PropTypes.bool,
      orphan: PropTypes.bool,
    })
  ),
};

Breadcrumb.defaultProps = {
  values: [],
};

export default Breadcrumb;
