import React from 'react';

import {mock} from '../../__mocks__/mock';
import {bufferTime, map} from 'rxjs/operators';

import {subjectAssets} from '../../subjects';

import AssetsSuggestions from '../AssetsSuggestions';
import AssetsFormHeader from '../AssetsFormHeader';
import Notification from '../Notification';

const BUFFER_TIME_GET_ASSETS_MILLISECONDS = 1000;

class AssetsForm extends React.Component {
  componentDidMount() {
    this.mock$ = mock.pipe(bufferTime(BUFFER_TIME_GET_ASSETS_MILLISECONDS),
      map(val => subjectAssets.next(val))).subscribe();
  }

  componentWillUnmount() {
    if (this.mock$) {
      this.mock$.unsubscribe();
    }
  }

  render() {
    return (
      <div className='asset-form'>
        <div className='ui form'>
          <AssetsFormHeader/>
          <Notification/>
          <AssetsSuggestions/>
        </div>
      </div>
    );
  }
}

export default AssetsForm;
