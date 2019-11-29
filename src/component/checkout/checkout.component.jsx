import React, { Component, useEffect } from 'react'
import API from '../../API/define-api'
import Axios from 'axios'
import './checkout.styles.scss'

class CheckOut extends Component {
  constructor() {
    super();

    this.state = {
      ReceiveName: '',
      ReceiveMobile: '',
      ReceiveAddress: '',
      ReceiveAddress: '',
      ReceiveAddress: '',
    }
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
                <form>
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
                              <input type="radio" name="PaymentMethod" className="" />
                              <span className="checkmark"></span>
                            </div>
                            <div className="payment-label">Payment by Stripe</div>
                          </div>
                          <div className="col-md-6 d-flex">
                            <div className="fix-size-radio">
                              <input type="radio" name="PaymentMethod" className="" />
                              <span className="checkmark"></span>
                            </div>
                            <div className="payment-label">Payment by Paypal</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 d-flex">
                            <div className="fix-size-radio">
                              <input type="radio" name="PaymentMethod" className="" />
                              <span className="checkmark"></span>
                            </div>
                            <div className="payment-label">Payment on Delivery</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 d-flex padding-10">
                      <div className="label"></div>
                      <input type="submit" className="form-control btn btn-success" value="Order" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CheckOut;