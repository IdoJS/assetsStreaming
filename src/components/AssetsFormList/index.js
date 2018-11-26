import React from 'react';
import AssetsFormListItem from './AssetsFormListItem';

const AssetsFormList = props => {
  const assets = props.assets
    .filter(asset => asset.assetName.toUpperCase().includes(props.filter.toUpperCase()) || asset.id.toString().includes(props.filter))
    .map((asset, key) => <AssetsFormListItem {...asset} key={key} fillInputFieldWithData={props.fillInputFieldWithData} />);

  return <div className="ui one cards assets-list">{assets}</div>;
};

export default AssetsFormList;
