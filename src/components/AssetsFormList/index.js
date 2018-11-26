import React from 'react';
import AssetsFormListItem from './AssetsFormListItem';
import PropTypes from 'prop-types';

const AssetsFormList = props => {
  const assets = props.assets
    .map((asset, key) => <AssetsFormListItem {...asset} key={key} fillInputFieldWithData={props.fillInputFieldWithData} />);

  return <div className='ui one cards assets-list'>{assets}</div>;
};

AssetsFormList.propTypes = {
  fillInputFieldWithData : PropTypes.func.isRequired
};

AssetsFormList.defaultProps = {
  fillInputFieldWithData : () => {}
};

export default AssetsFormList;
