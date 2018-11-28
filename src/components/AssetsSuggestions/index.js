import React from 'react';
import AssetsSuggestionsItem from './AssetsSuggestionsItem';
import {isSubstring} from '../../utils';
import {subjectAssets, subjectFilterName} from '../../subjects';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {filter, debounceTime} from 'rxjs/operators';

const MINIMUM_LETTERS_BEFORE_FILTER = 2;
const DENOUNCE_TIME_MILLISECOND = 100;

class AssetsSuggestions extends React.PureComponent {

  state = {
    assets: []
  }

  componentDidMount() {
    const extraNameFilter = subjectFilterName.pipe(
      debounceTime(DENOUNCE_TIME_MILLISECOND),
      filter(val => val.length >= MINIMUM_LETTERS_BEFORE_FILTER));

    this.conbine$ = combineLatest(subjectAssets, extraNameFilter)
      .map(all => {
        const [assets, name] = all;
        return assets.filter(asset => isSubstring(asset.assetName, name))
      })
      .distinctUntilChanged()
      .do(assets => this.setState({assets}))
      .subscribe();
  }

  componentWillUnmount() {
    if (this.conbine$) {
      this.conbine$.unsubscribe();
    }
  }

  render() {
    const assets = this.state.assets
      .map((asset, key) => <AssetsSuggestionsItem {...asset} key={key}/>);

    return this.state.assets.length > 0 ? <div className='ui two cards assets-suggest-list'>{assets}</div> : null;
  }
}

export default AssetsSuggestions;
