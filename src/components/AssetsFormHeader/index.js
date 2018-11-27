import React from 'react';
import {Subject} from 'rxjs';
import Notification from '../Notification';
import PropTypes from 'prop-types';

const NOTIFICATION_TIMER_MILLISECOND = 5000;

class AssetsFormHeader extends React.Component {
  static defaultProps = {
    isAutoFill: false,
    clickedAsset: {},
    fillInputFieldWithData: () => {
    }
  };

  static propTypes = {
    isAutoFill: PropTypes.bool.isRequired,
    clickedAsset: PropTypes.object.isRequired,
    fillInputFieldWithData: PropTypes.func.isRequired
  };

  state = {
    showNotification: false,
    buyAssetValues: {},
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
    this.handleBuyInNotification = this.handleBuyInNotification.bind(this);
    this.buyAsset$ = new Subject();
  }

  componentWillMount() {
    this.buyAsset$
      .do(this.handleBuyInNotification)
      .subscribe();
  }

  componentWillReceiveProps(nextProps) {
    const {assetName = '', id = '', price = ''} = nextProps.clickedAsset;
    this.clickedAsset = Object.assign({}, nextProps.clickedAsset);

    let state = {
      enableButton: nextProps.isAutoFill
    };
    if (nextProps.isAutoFill) {
      state = Object.assign(state, {
        id,
        assetName,
        price
      });
    } else {
      state = Object.assign(state, {
        price: 0
      });
    }

    this.setState(state);
  }

  componentWillUnmount() {
    clearTimeout(this.notificationTimer);
    if (this.buyAsset$) {
      this.buyAsset$.unsubscribe();
    }
  }

  handleBuyInNotification(buyInAsset) {
    this.setState({
      showNotification: true,
      buyAssetValues: Object.assign({}, buyInAsset)
    });

    clearTimeout(this.notificationTimer);
    this.notificationTimer = setTimeout(() => {
      this.setState({
        showNotification: false
      });
    }, NOTIFICATION_TIMER_MILLISECOND);
  }

  inputTyping(ev) {
    ev.preventDefault();

    this.setState({
      [ev.target.name]: ev.target.value
    });

    if (ev.target.name === 'assetName') {
      this.props.filterItemsName(ev.target.value);
    }

    if (ev.target.name === 'id') {
      this.props.filterItemsID(ev.target.value);
    }
  }

  buyAsset(ev) {
    ev.preventDefault();
    this.buyAsset$.next(this.clickedAsset);
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
        {this.state.showNotification ? <Notification {...this.state.buyAssetValues} /> : null}
      </div>
    );
  }
}

export default AssetsFormHeader;
