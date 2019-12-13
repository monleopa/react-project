import React, { Component} from 'react'
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
      totalProduct: 0,
      currentListOrderDetail: [],
      saleCodeID: null,
      saleCodeType: 1,
      saleCodeValue: 100,
      saleCodeString: '',
      errorDiscountMessage: '',
      errorDiscountShow: false,
      saleCode: null,
      errorrStartOrder: '',
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
            alert("error");
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

    this.props.saveCurrentListOrderDetail(listOrder, this.state.totalProduct);
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

    this.props.saveCurrentListOrderDetail(listOrder, this.state.totalProduct);
  }

  totalAmount = () => {
    var totalProduct = 0;
    var totalAmount = 0;
    var listOrder = this.state.listOrderDetail;
    for (var i = 0; i < listOrder.length; i++) {
      totalProduct += listOrder[i].price * listOrder[i].quantity;
    }

    if (this.state.saleCodeType === 1) {
      totalAmount = totalProduct * this.state.saleCodeValue / 100;
    } else {
      totalAmount = totalProduct - this.state.saleCodeValue;
    }

    totalAmount = totalAmount > 0 ? totalAmount : 0;

    this.setState({
      totalProduct: totalProduct,
      totalAmount: totalAmount
    })

    this.props.saveCurrentListOrderDetail(listOrder, this.state.totalProduct);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  applyDiscountCode = () => {
    var link = API.discount + this.state.saleCodeString;
    var me = this;
    if (this.state.saleCodeValue === 100 && this.state.saleCodeType === 1) {
      Axios.get(link).then(res => {
        if (res.status === 200) {
          if (res.data.success) {
            var data = res.data.data;
            me.setState({
              saleCodeValue: data.saleCodeValue,
              saleCodeType: data.saleCodeType,
              saleCode: data,
              saleCodeID: data.saleCodeID,
              errorDiscountMessage: '',
              errorDiscountShow: false,
              saleCodeString: '',
            })

            me.totalAmount();
          } else {
            if (res.data.errorCode === 1) {
              me.setState({
                errorDiscountMessage: res.data.error,
                errorDiscountShow: true,
              });
            }
          }
        }
      })
    } else {
      this.setState({
        errorDiscountMessage: "Each order is only applied 1 time discount code",
        errorDiscountShow: true,
      });
    }
  }

  startOrder = () => {
    if(this.state.listOrderDetail.length > 0) {
      var data = {
        OrderID: this.state.order.orderID,
        ListOrderDetail: this.state.listOrderDetail,
        AccountID: this.user.accountID,
        TotalAmount: this.state.totalAmount,
        ProductAmount: this.state.totalProduct,
      }

      if(this.state.saleCodeID) {
        data["SaleCodeID"] = this.state.saleCodeID;
      }

      console.log(this.state.saleCode)
      Axios.put(API.order, data).then(res => {
        if(res.status === 200) {
          if(res.data.success) {
            window.location.href = "/checkout/" + data.OrderID;
          } else {
            alert("Error orrcur");
          }
        } else {
          alert("Error orrcur");
        }
      })
    } else {
      this.setState({
        errorrStartOrder: "You must have at least 1 item in your cart"
      })
    }
  }

  saveOrder = () => {
    var data = {
      OrderID: this.state.order.orderID,
      ListOrderDetail: this.state.listOrderDetail,
      AccountID: this.user.accountID,
      TotalAmount: this.state.totalAmount,
      ProductAmount: this.state.totalProduct,
    }
    Axios.put(API.order, data).then(res => {
      if(res.status === 200) {
        if(res.data.success) {
          alert("success");
        } else {
          alert("Error orrcur");
        }
      } else {
        alert("Error orrcur");
      }
    })

  }

  render() {
    this.user = this.props.user;
    const { order, listOrderDetail } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <table className="table table-order">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Size</th>
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
                    <tr><td colSpan="5">You don't have any item</td></tr>
                }
              </tbody>
            </table>
          </div>
          <div className="col-md-3 fix-order-container">
            {
              this.state.errorrStartOrder ?
              <div className="row error">
                {this.state.errorrStartOrder}
              </div>
              : null
            }
            <div className="row total-size text-left">
              Total Products:
              <span className="price-number total-size total-amount"> {this.state.totalProduct}$</span>
            </div>
            <div className="row total-size text-left">
              Discount:
              <span className="price-number total-size total-amount">
                {
                  this.state.saleCodeType === 1 ?
                    ((100 - this.state.saleCodeValue) + '%')
                    :
                    (this.state.saleCodeValue + '$')
                }
              </span>
            </div>

            {
              this.state.errorDiscountShow ?
                (<div className="row error">
                  {this.state.errorDiscountMessage}
                </div>)
                :
                null
            }

            <div className="row">
              <div className="col-md-8 none-padding">
                <input className="form-control" name="saleCodeString" onChange={this.handleChange} />
              </div>
              <div className="col-md-4 none-padding">
                <button className="btn btn-warning" onClick={this.applyDiscountCode}>Apply</button>
              </div>
            </div>

            <hr />

            <div className="row">
              <b>Total Amount:</b>
              <span className="price-number total-size total-amount"><b> {this.state.totalAmount}$</b></span>
            </div>

            <div className="row"><button className="form-control btn btn-success" onClick={this.startOrder}>START ORDER</button></div>

            <div className="row"><button className="form-control btn btn-primary" onClick={this.saveOrder}>SAVE</button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;