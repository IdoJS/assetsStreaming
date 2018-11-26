import React from 'react';

const Notification = props => {
  const { assetName, id, price } = props;

  return (
    <div className="buy-asset-notification slide-in-out">
      <div className="ui message ">
        <span>Asset Name: </span>
        <span>{assetName}</span>
        <div class="ui section divider" />
        <span>Asset Id: </span>
        <span>{id}</span>
        <div class="ui section divider" />
        <span>Asset Price: </span>
        <span>{price}</span>
      </div>
    </div>
  );
};

/*
<div class="ui message">
  <div class="header">
    Changes in Service
  </div>
  <p>We just updated our privacy policy here to better service our customers. We recommend reviewing the changes.</p>
</div>
*/
export default Notification;
