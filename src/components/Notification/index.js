import React from 'react';
import PropTypes from 'prop-types';

const Notification = props => {
  const { assetName, id, price } = props;

  return (
    <div className='buy-asset-notification slide-in-out'>
      <div className='ui message '>
        <span>Asset Name: </span>
        <span>{assetName}</span>
        <div className='ui section divider' />
        <span>Asset Id: </span>
        <span>{id}</span>
        <div className='ui section divider' />
        <span>Asset Price: </span>
        <span>{price}</span>
      </div>
    </div>
  );
};

Notification.propTypes = {
  assetName : PropTypes.string.isRequired,
  id : PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
};

Notification.defaultProps = {
  assetName : '',
  id : 0,
  price: 0
};

export default Notification;
