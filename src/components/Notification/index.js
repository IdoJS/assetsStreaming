import React from 'react';

import {subjectBuyAsset} from '../../subjects';

class Notification extends React.PureComponent {

  state = {
    show: false,
    assetName: '',
    id: 0,
    price: 0
  }

  componentDidMount() {
    this.buyAsset$ = subjectBuyAsset
      .do((data) => this.setState(data))
      .subscribe()
  }

  componentWillUnmount() {
    if (this.buyAsset$) {
      this.buyAsset$.unsubscribe();
    }
  }

  render() {
    const {assetName, id, price} = this.state;

    return (
      this.state.show ?
      <div className={`buy-asset-notification slide-in-out`}>
        <div className='ui message '>
          <span>Asset Name: </span>
          <span>{assetName}</span>
          <div className='ui section divider'/>
          <span>Asset Id: </span>
          <span>{id}</span>
          <div className='ui section divider'/>
          <span>Asset Price: </span>
          <span>{price}</span>
        </div>
      </div> : null
    );
  }
};


export default Notification;
