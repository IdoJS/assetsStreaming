import React from 'react';
import PropTypes from 'prop-types';
import {subjectFilterId} from '../../subjects';

const AssetsSuggestionsItems = props => {
  return (
    <div
      className='blue card assets-suggest-list-item'
      onClick={() => {
        subjectFilterId.next(props.id);
      }}
    >
      <h3>{props.assetName}</h3>
      <h3>{props.id}</h3>
    </div>
  );
};

AssetsSuggestionsItems.propTypes = {
  assetName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

AssetsSuggestionsItems.defaultProps = {
  assetName: '',
  id: 0
};
export default AssetsSuggestionsItems;
