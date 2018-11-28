import React from 'react';
import {
  subjectAssets,
  subjectFilterId,
  subjectFilterName,
  subjectBuyAsset
} from '../../subjects';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {isSubstring} from '../../utils';

const NOTIFICATION_TIMER_MILLISECOND = 5000;

class AssetsFormHeader extends React.PureComponent {

  state = {
    assetName: '',
    id: '',
    price: '',
    enableButton: false
  };

  constructor(props) {
    super(props);

    this.notificationTimer = null;

    this.buyAsset = this.buyAsset.bind(this);
    this.inputTyping = this.inputTyping.bind(this);
  }

  componentWillMount() {
    this.conbine$ = combineLatest(subjectAssets, subjectFilterId)
      .map(all => {
        const [assets, id] = all;
        return assets.filter(asset => isSubstring(asset.id, id))
      })
      .distinctUntilChanged()
      .do(assets => Array.isArray(assets) && assets.length === 1 && this.setState({
        enableButton: true,
        ...assets[0]
      }))
      .do(assets => Array.isArray(assets) && assets.length === 1 && subjectFilterName.next(assets[0].assetName))
      .subscribe();
  }

  componentWillUnmount() {
    clearTimeout(this.notificationTimer);

    if (this.conbine$) {
      this.conbine$.unsubscribe();
    }
  }


  inputTyping(ev) {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: ev.target.value
    });

    if (ev.target.name === 'assetName') {
      subjectFilterName.next(ev.target.value);
    }

    if (ev.target.name === 'id') {
      subjectFilterId.next(ev.target.value);
    }
  }

  buyAsset(ev) {
    ev.preventDefault();
    subjectBuyAsset.next({
      show: true,
      id: this.state.id,
      assetName: this.state.assetName,
      price: this.state.price
    });

    clearTimeout(this.notificationTimer);
    this.notificationTimer = setTimeout(() => {
      subjectBuyAsset.next({
        show: false
      });
    }, NOTIFICATION_TIMER_MILLISECOND);
  }

  render() {
    return (
      <div className='assets-header'>
        <div className='assets-header-input'>
          <div>Asset Name</div>
          <input name='assetName' type='text' onChange={this.inputTyping} value={this.state.assetName}
                 placeholder={this.state.placeholder}/>
          <div>Asset Id</div>
          <input name='id' type='text' onChange={this.inputTyping} value={this.state.id}/>
          <div>Asset Price</div>
          <input disabled={true} type='text' value={this.state.price}/>
        </div>
        <button className='assets-header-button' disabled={!this.state.enableButton} onClick={this.buyAsset}>
          Buy
        </button>
      </div>
    );
  }
}

export default AssetsFormHeader;
