import React from 'react';
import './item.styles.scss';

class Item extends React.Component {
  viewDetail = () => {
    window.location.href = "/item/" + this.ItemID;
  }

  render() {
    const { itemName, price, itemImage, itemCode, itemID } = this.props.item;
    var newClass = this.props.addClass ? this.props.addClass : "";
    var classCollection = newClass ? 'collection-item col-sm-3 '+ newClass : 'collection-item col-sm-3'
    this.ItemID = itemID;
    return (
      <div key={itemID} className={classCollection} title={itemName}>
        <div
          className='image'
          style={{
            backgroundImage: `url(${itemImage})`
          }}
          onClick = {this.viewDetail}
        />
        <div className='collection-footer row'>
          <span className='name col-md-12'><b>{itemName}</b></span>
        </div>
        <div className='collection-footer row footer-second'>
          <span className='item-code col-md-6'>{itemCode}</span>
          <span className='price col-md-6'>{price}$</span>
        </div>
      </div>
    );
  }
}

export default Item;
