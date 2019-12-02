import React, { Component } from 'react'
import API from '../../API/define-api'
import Axios from 'axios'
import './order-item.styles.scss'

class OrderItem extends Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  handleChange = (orderDetailID, e) => {
    var value = e.target.value;
    this.props.changeListOrder(orderDetailID, value);
  }

  increaseItem = (id, e) => {
    var { quantity } = this.props.orderDetail;
    quantity = Number(quantity) + 1;
    this.props.changeListOrder(id, quantity);
  }

  decreaseItem = (id) => {
    var { quantity } = this.props.orderDetail;
    quantity = quantity - 1;
    if (quantity >= 0) {
      this.props.changeListOrder(id, quantity);
    }
  }

  deleteItem = (id) => {
    this.props.deleteItemFromOrder(id);
  }

  render() {
    const { orderDetailID, itemImage, itemName, quantity, price, size } = this.props.orderDetail;
    return (
      <tr>
        <td>
          <div>
            <div
              className='image'
              style={{
                backgroundImage: `url(${itemImage})`
              }}
            />
            <div><b>{itemName}</b></div>
          </div>
        </td>
        <td>{size}</td>
        <td>
          <div className="d-flex">
            <i className="fas fa-minus set-size" onClick={this.decreaseItem.bind(null, orderDetailID)}></i>
            <input className="form-control quantity-size" name="quantity"
              data={orderDetailID} value={quantity}
              onChange={this.handleChange.bind(null, orderDetailID)} />
            <i className="fas fa-plus set-size" onClick={this.increaseItem.bind(null, orderDetailID)}></i>
          </div>
        </td>
        <td className="price-number">{price}$</td>
        <td className="icon-center">
          <i className="far fa-trash-alt" onClick={this.deleteItem.bind(null, orderDetailID)}></i>
        </td>
      </tr>
    )
  }
}

export default OrderItem;