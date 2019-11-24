import React from 'react';
import './item.styles.scss';

const Item = ({ item }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className='collection-item col-sm-3' title={name}>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer row'>
        <span className='name col-md-8'>{name}</span>
        <span className='price col-md-4'>{price}$</span>
      </div>
    </div>
  );
};

export default Item;
