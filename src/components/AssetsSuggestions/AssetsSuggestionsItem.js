import React from 'react';
import PropTypes from 'prop-types';

const AssetsSuggestionsItems = props => {
  return (
    <div
      className='blue card assets-suggest-list-item'
      onClick={() => {
        props.fillInputFieldWithData(props);
      }}
    >
      <h3>{props.assetName}</h3>
    </div>
  );
};

AssetsSuggestionsItems.propTypes = {
  fillInputFieldWithData: PropTypes.func.isRequired,
  assetName: PropTypes.string.isRequired
};

AssetsSuggestionsItems.defaultProps = {
  assetName: '',
  fillInputFieldWithData: () => {
  }
};
export default AssetsSuggestionsItems;
