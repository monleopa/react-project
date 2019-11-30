import React, { Component, useState, useRef, useEffect } from 'react'
import API from '../../API/define-api'
import StripeCheckoutButton from '../../API/stripe'
import Axios from 'axios'
import './checkout.styles.scss'

class CheckOut extends Component {
  constructor() {
    super();

    this.state = {
      ReceiveName: '',
      ReceiveMobile: '',
      ReceiveAddress: '',
      PaymentID: 1,
      Description: '',
      showInforSuccess: false,
      order: null,
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  checkPayment = (id, e) => {
    this.setState({
      PaymentID: id
    });
  }

  startOrder = (e) => {
    var me = this;
    e.preventDefault();
    var data = {
      ReceiveName: this.state.ReceiveName,
      ReceiveMobile: this.state.ReceiveMobile,
      ReceiveAddress: this.state.ReceiveAddress,
      PaymentID: this.state.PaymentID,
      Description: this.state.Description,
      OrderDate: new Date(),
      Status: 1,
      OrderID: window.location.pathname.split('/')[2]
    }

    Axios.post(API.checkout, data).then(res => {
      if (res.status === 200) {
        if (res.data.success) {
          me.setState({
            order: res.data.data,
            showInforSuccess: true,
          })
        } else {
          console.log(res.data.data)
          alert("error occurr");
        }
      } else {
        alert("error network");
      }
    });
  }

  goToHome = () => {
    window.location.href = "/";
  }

  render() {
    return (
      <div className="container center checkout">
        <div className="row">
          <div className="col-md-12">
            <div className="row tittle-center">
              <div className="col-md-12">
                PROCESS TO ORDERING
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <img src={process.env.PUBLIC_URL + '/assets/order.png'} width="90%" alt="img" />
              </div>
              <div className="col-md-8">
                <form onSubmit={this.startOrder}>
                  <div className="row">
                    <div className="col-md-12 d-flex padding-10">
                      <div className="label">Receiver Name:</div>
                      <input className="form-control" type="text" name="ReceiveName"
                        onChange={this.handleChange} required />
                    </div>
                    <div className="col-md-12 d-flex padding-10">
                      <div className="label">Mobile:</div>
                      <input className="form-control" type="text" name="ReceiveMobile"
                        onChange={this.handleChange} required />
                    </div>
                    <div className="col-md-12 d-flex padding-10">
                      <div className="label">Address:</div>
                      <textarea className="form-control text-area" name="ReceiveAddress" rows="3"
                        onChange={this.handleChange} required ></textarea>
                    </div>
                    <div className="col-md-12 d-flex padding-10">
                      <div className="label">Description:</div>
                      <textarea className="form-control text-area" name="Description" rows="3"
                        onChange={this.handleChange}></textarea>
                    </div>
                    <div className="col-md-12 d-flex padding-10">
                      <div className="label payment">
                        Payment Method:
                      </div>
                      <div className="radio-group">
                        <div className="row">
                          <div className="col-md-6 d-flex">
                            <div className="fix-size-radio">
                              <input type="radio" name="PaymentMethod"
                                className="" checked={this.state.PaymentID == 1}
                                onChange={this.checkPayment.bind(null, 1)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="payment-label">Payment on Delivery</div>
                          </div>
                          <div className="col-md-6 d-flex">
                            <div className="fix-size-radio">
                              <input type="radio" name="PaymentMethod"
                                className="" checked={this.state.PaymentID == 2}
                                onChange={this.checkPayment.bind(null, 2)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="payment-label">Payment by Paypal</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 d-flex">
                            <div className="fix-size-radio">
                              <input type="radio" name="PaymentMethod"
                                className="" checked={this.state.PaymentID == 3}
                                onChange={this.checkPayment.bind(null, 3)}
                              />
                              <span className="checkmark"></span>
                            </div>
                            <div className="payment-label">Payment by Stripe</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex padding-10">
                      <div className="label"></div>
                      <input type="submit" className="form-control btn btn-success" value="Order" />
                      <StripeCheckoutButton className="form-control btn stripe-btn" price={5000}
                        ref={StripeCheckoutButton => this.stripeElement = StripeCheckoutButton}
                      />
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {
          this.state.showInforSuccess
            ?
            (
              <div>
                <div className="abs-class"></div>
                <div className="infor-content">
                  <div className="row title-infor">
                    <div className="center">
                      <span className="infor-title">ORDER SUCCESS</span>
                      <i className="fas fa-check-circle font-icon"></i>
                    </div>
                  </div>
                  <div className="row">
                    <span className="label-infor">Order Code: </span>
                    <span className="">{this.state.order.orderCode}</span>
                  </div>
                  <div className="row">
                    <span className="label-infor">Receiver Name: </span>
                    <span className="">{this.state.ReceiveName}</span>
                  </div>
                  <div className="row">
                    <span className="label-infor">Receiver Mobile: </span>
                    <span className="">{this.state.ReceiveMobile}</span>
                  </div>
                  <div className="row">
                    <span className="label-infor">Receiver Address: </span>
                    <span className="">{this.state.ReceiveAddress}</span>
                  </div>
                  <div className="row">
                    <span className="label-infor">Payment Method: </span>
                    <span className="">{this.state.order.paymentName}</span>
                  </div>
                  <div className="row">
                    <span className="label-infor">Products Amount: </span>
                    <span className="">{this.state.order.productAmount}$</span>
                  </div>
                  <div className="row">
                    <span className="label-infor">Discount: </span>
                    <span className="">{this.state.order.productAmount - this.state.order.totalAmount}$</span>
                  </div>
                  <div className="row">
                    <span className="label-infor">Total Amount: </span>
                    <span className="">{this.state.order.totalAmount}$</span>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="center">
                      <span className='footer-infor'>Thanks you ! Your Order will be shipped as soon as possible</span>
                      <button className="btn btn-success" onClick={this.goToHome}>Continue Shopping</button>
                    </div>
                  </div>
                </div>
              </div>)
            :
            null
        }
      </div>
    )
  }
}

export default CheckOut;