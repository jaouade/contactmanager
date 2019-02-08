import React from 'react';
import PropTypes from 'prop-types';
const CardHeader = props => {
  const {
    onclick,
    isBodyShown,
    firstClass,
    oppositeClass,
    color,
    title
  } = props;
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={onclick}
      className={'card-header bg-transparent border-' + color}
    >
      <span style={{ cursor: 'pointer' }} onClick={onclick}>
        {title}
      </span>
      <i
        onClick={onclick}
        className={!isBodyShown ? 'fas ' + firstClass : 'fas ' + oppositeClass}
        style={{ float: 'right', cursor: 'pointer' }}
      />{' '}
    </div>
  );
};

CardHeader.propTypes = {
  isBodyShown: PropTypes.bool.isRequired,
  firstClass: PropTypes.string.isRequired,
  oppositeClass: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired
};
CardHeader.defaultProps = {
  isBodyShown: false,
  firstClass: 'fa-plus',
  oppositeClass: 'fa-minus',
  color: 'success'
};
export default CardHeader;
