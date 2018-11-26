import React from 'react';
import Notification from '../Notification';
import PropTypes from 'prop-types';

class AssetsFormHeader extends React.Component {
  static defaultProps = {
    assets: []
  };

  static propTypes = {
    assets: PropTypes.array.isRequired
  };

  state = {
    showNotification: false,
    buyAssetValues: {},
    assetName: this.props.assetName,
    id: this.props.id,
    price: this.props.price,
    enableButton: false
  };

  constructor(props) {
    super(props);

    this.notificationTimer = null;

    this.buyAsset = this.buyAsset.bind(this);
    this.inputTyping = this.inputTyping.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { assetName = '', id = '', price = '' } = nextProps.clickedAsset;

    let state = {
      enableButton: !(nextProps.assets.length === 1 || (assetName.toString().length === 5 && id.toString().length === 5))
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
  }

  inputTyping(ev) {
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
    const buyIn = this.props.assets.filter(asset => asset.id === this.state.id && asset.assetName === this.state.assetName);

    if (buyIn.length === 1) {
      this.setState({
        showNotification: true,
        buyAssetValues: Object.assign({}, buyIn[0])
      });
    }

    clearTimeout(this.notificationTimer);
    this.notificationTimer = setTimeout(() => {
      this.setState({
        showNotification: false
      });
    }, 5000);
  }
  render() {
    return (
      <div className="assets-header">
        <div className="assets-header-input">
          <span>Asset Name</span>
          <input name="assetName" type="text" onChange={this.inputTyping} value={this.state.assetName} />
          <span>Asset Id</span>
          <input name="id" type="text" onChange={this.inputTyping} value={this.state.id} />
          <span>Asset Price</span>
          <input disabled="true" type="text" value={this.state.price} />
        </div>
        <button className="assets-header-button" disabled={this.state.enableButton} onClick={this.buyAsset}>
          Buy
        </button>
        {this.state.showNotification ? <Notification {...this.state.buyAssetValues} /> : null}
      </div>
    );
  }
}

export default AssetsFormHeader;