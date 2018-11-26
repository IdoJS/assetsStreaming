import React from 'react';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {bufferTime} from 'rxjs/operators';
import {isSubstring, isEqualString, checkTypingReachAssetMaxLength} from '../../utils';
import {mock} from '../../__mocks__/mock';

import AssetsSuggestions from '../AssetsSuggestions';
import AssetsFormHeader from '../AssetsFormHeader';

class AssetsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      clickedAsset: {},
      suggestionsList: []
    };

    this.onFilterId$ = new BehaviorSubject('');
    this.onFilterName$ = new BehaviorSubject('');
    this.suggestionName$ = new BehaviorSubject('');

    this.generateSuggestionList = this.generateSuggestionList.bind(this);
    this.filterItemsID = this.filterItemsID.bind(this);
    this.filterItemsName = this.filterItemsName.bind(this);
    this.fillInputFieldWithData = this.fillInputFieldWithData.bind(this);

    this.id = '';
    this.assetName = '';
    this.clickedAsset = {};
    this.autoFill = false;
  }

  componentDidMount() {
    this.assets = {};
    this.mock$ = mock.pipe(bufferTime(1000));

    this.conbine$ = combineLatest(this.mock$, this.onFilterName$, this.onFilterId$)
      .map(all => this.filterAssetList(...all))
      .do(assets => this.checkAutoFillHeader(assets))
      .subscribe(assets => this.setState({
        assets,
        clickedAsset: this.clickedAsset
      }));

    this.suggestionName$
      .do(this.generateSuggestionList)
      .subscribe();
  }

  componentWillUnmount() {
    if (this.conbine$) {
      this.conbine$.unsubscribe();
    }

    if (this.suggestionName$) {
      this.suggestionName$.unsubscribe();
    }
  }

  /**
   * Return filtered array of assets.
   * @param assets
   * @param filterName
   * @param filterId
   */
  filterAssetList(assets, filterName, filterId) {
    return assets.filter(asset => {
      return isSubstring(asset.assetName, filterName) && isSubstring(asset.id, filterId);
    });
  }

  /**
   * Set asset data in the form header
   * @param assets
   */
  checkAutoFillHeader(assets) {
    const clickedAsset = !this.autoFill ? [] : assets.filter(asset => isEqualString(asset.id, this.id) || isEqualString(asset.assetName, this.assetName));
    this.clickedAsset = clickedAsset.length === 1 ? clickedAsset[0] : {};
  }

  /**
   * Filter the assets and generate suggestion list
   * @param name
   */
  generateSuggestionList(name) {
    if (name.length > 1) {
      this.setState({
        suggestionsList: this.state.assets.filter(asset => isSubstring(asset.assetName, name)) || []
      })
    } else {
      this.setState({
        suggestionsList: []
      });
    }
  }

  filterItemsID(value) {
    if (checkTypingReachAssetMaxLength(value)) {
      this.autoFill = true;
      this.id = value;
    } else {
      this.autoFill = false;
      this.id = value;
    }

    this.onFilterId$.debounceTime(100).next(value);
  }

  filterItemsName(value) {
    this.suggestionName$.next(value);

    if (checkTypingReachAssetMaxLength(value)) {
      this.autoFill = true;
      this.assetName = value;
    } else {
      this.autoFill = false;
      this.assetName = value;
    }

    this.onFilterName$.debounceTime(100).next(value);
  }

  fillInputFieldWithData({assetName, id, price}) {
    this.autoFill = true;
    this.id = id;
  }

  render() {
    const suggestions = this.state.suggestionsList.length > 0 ? <AssetsSuggestions assets={this.state.suggestionsList}
                                                                                   fillInputFieldWithData={this.fillInputFieldWithData}/> : null;
    return (
      <div className='asset-form'>
        <div className='ui form'>
          <AssetsFormHeader
            assets={this.state.assets}
            filterItemsName={this.filterItemsName}
            filterItemsID={this.filterItemsID}
            clickedAsset={this.state.clickedAsset}
            isAutoFill={this.autoFill}
          />
          {suggestions}
        </div>
      </div>
    );
  }
}

export default AssetsForm;
