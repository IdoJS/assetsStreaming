import React from 'react';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import Rx from 'rxjs/Rx';
import {bufferTime, debounceTime, combineLatest} from 'rxjs/operators';
import {isSubstring, isEqualString} from '../../utils';
import {mock} from '../../__mocks__/mock';

import AssetsFormList from '../AssetsFormList';
import AssetsFormHeader from '../AssetsFormHeader';

class AssetsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      filter: '',
      clickedAsset: {}
    };

    this.onFilterId$ = new BehaviorSubject('');
    this.onFilterName$ = new BehaviorSubject('');

    this.filterItemsID = this.filterItemsID.bind(this);
    this.filterItemsName = this.filterItemsName.bind(this);
    this.fillInputFieldWithData = this.fillInputFieldWithData.bind(this);

    this.id = '';
    this.assetName = '';
  }

  componentDidMount() {
    this.assets = {};
    this.mock$ = mock.pipe(bufferTime(1000));

    this.conbine$ = Rx.Observable.combineLatest(this.mock$, this.onFilterName$, this.onFilterId$)
      .map(all => {
        const [assets, filterName, filterId] = all;
        return assets.filter(asset => {
          return isSubstring(asset.assetName, filterName) && isSubstring(asset.id, filterId);
        });
      })
      .do(assets => {
        let clickedAsset = [];
        if (this.autoFill) {
          clickedAsset = assets.filter(asset => isEqualString(asset.id, this.id) || isEqualString(asset.assetName, this.assetName));
        }
        this.setState({
          assets,
          clickedAsset: clickedAsset.length === 1 ? clickedAsset[0] : {}
        });
      })
      .subscribe();
  }

  componentWillUnmount() {
    if (this.conbine$) {
      this.conbine$.unsubscribe();
    }
  }

  filterItemsID(value) {
    if (value.toString().length === 5) {
      this.autoFill = true;
      this.id = value;
    } else {
      this.autoFill = false;
      this.id = value;
    }

    this.onFilterId$.debounceTime(100).next(value);
  }

  filterItemsName(value) {
    if (value.toString().length === 5) {
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
    return (
      <div className="ui form asset-form">
        <AssetsFormHeader
          assets={this.state.assets}
          filterItemsName={this.filterItemsName}
          filterItemsID={this.filterItemsID}
          clickedAsset={this.state.clickedAsset}
          isAutoFill={this.autoFill}
        />
        <AssetsFormList assets={this.state.assets} filter={this.state.filter}
                        fillInputFieldWithData={this.fillInputFieldWithData}/>
      </div>
    );
  }
}

export default AssetsForm;
