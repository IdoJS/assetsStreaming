import React from 'react';
import AssetsSuggestionsItem from './AssetsSuggestionsItem';
import PropTypes from 'prop-types';

class AssetsSuggestions extends React.Component{

  static propTypes = {
    fillInputFieldWithData : PropTypes.func.isRequired,
    assets : PropTypes.array.isRequired
  };

  static defaultProps = {
    fillInputFieldWithData : () => {},
    assets : []
  };

  shouldComponentUpdate(nextProps){
    return nextProps.assets.length !== this.props.assets.length
  }

  render(){
    const assets = this.props.assets
      .map((asset, key) => <AssetsSuggestionsItem {...asset} key={key} fillInputFieldWithData={this.props.fillInputFieldWithData} />);

    return <div className='ui six cards assets-suggest-list'>{assets}</div>;
  }
}

export default AssetsSuggestions;
