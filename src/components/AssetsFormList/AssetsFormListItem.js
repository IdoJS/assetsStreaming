import React from 'react';
import PropTypes from 'prop-types';

const AssetsFormListItem = props => {
  return (
    <div
      className="red card assets-list-item"
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
  fillInputFieldWithData: PropTypes.func.isRequired
};

AssetsFormListItem.defaultProps = {
  fillInputFieldWithData: () => {}
};
export default AssetsFormListItem;
