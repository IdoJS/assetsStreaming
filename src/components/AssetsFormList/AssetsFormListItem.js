import React from 'react';
import PropTypes from 'prop-types';

const AssetsFormListItem = props => {
  return (
    <div
      className='red card assets-list-item'
      onClick={() => {
        props.fillInputFieldWithData(props);
      }}
    >
      <h3>{props.assetName}</h3>
      <h3>{props.price}</h3>
      <h3>{props.id}</h3>
    </div>
  );
};

AssetsFormListItem.propTypes = {
  fillInputFieldWithData: PropTypes.func.isRequired,
  assetName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired
};

AssetsFormListItem.defaultProps = {
  assetName: '',
  price: 0,
  id: 0,
  fillInputFieldWithData: () => {
  }
};
export default AssetsFormListItem;
