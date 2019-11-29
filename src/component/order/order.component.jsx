import React, { Component, useEffect } from 'react'
import API from '../../API/define-api'
import Axios from 'axios'
import './order.styles.scss'

import OrderItem from '../order-item/order-item.component'

class Order extends Component {
  constructor() {
    super();

    this.state = {
      order: null,
      listOrderDetail: [],
      totalAmount: 0,
    }
  }

  componentDidMount = () => {
    var me = this;
    if (this.user) {
      var id = this.user.accountID;
      Axios.get(API.getOrder + id).then(res => {
        if (res.status === 200) {
          if (res.data.success) {
            var data = res.data.data;
            me.setState({
              order: data,
              listOrderDetail: data.listOrderDetail,
            })

            me.totalAmount();
          } else {
            console.log(res.data.data)
          }
        }
      });
    } else {
      window.location.href = "/";
    }
  }

  // useEffect = () => {
  //   console.log(this.props.user)
  // };

  changeListOrder = (id, value) => {
    var listOrder = this.state.listOrderDetail;
    listOrder.map(x => {
      if (x.orderDetailID == id) {
        x.quantity = value;
      }
    })

    this.setState({
      listOrderDetail: listOrder,
    })

    this.totalAmount();
  }

  deleteItemFromOrder = (id) => {
    var listOrder = this.state.listOrderDetail;

    for (var i = 0; i < listOrder.length; i++) {
      if (listOrder[i].orderDetailID === id) {
        listOrder.splice(i, 1);
        i--;
      }
    }

    this.setState({
      listOrderDetail: listOrder,
    })
    this.totalAmount();
  }

  totalAmount = () => {
    var totalAmount = 0;
    var listOrder = this.state.listOrderDetail;
    for (var i = 0; i < listOrder.length; i++) {
      totalAmount += listOrder[i].price * listOrder[i].quantity;
    }

    this.setState({
      totalAmount: totalAmount
    }) 
  }

  render() {
    this.user = this.props.user;
    const { order, listOrderDetail } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-order">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {
                  listOrderDetail.length > 0
                    ?
                    (listOrderDetail.map(
                      orderDetail => (<OrderItem key={orderDetail.orderDetailID}
                        orderDetail={orderDetail} changeListOrder={this.changeListOrder}
                        deleteItemFromOrder={this.deleteItemFromOrder} />)
                    ))
                    :
                    <tr><td colSpan="4">You don't have any item</td></tr>
                }
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td className="total-size"><b>Total:</b></td>
                  <td className="price-number total-size"><b>{this.state.totalAmount}$</b></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td><button className="btn btn-primary">SAVE</button></td>
                  <td className="price-number"><button className="btn btn-danger">START ORDER</button></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;