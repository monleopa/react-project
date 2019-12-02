import React, { Component } from 'react'
import API from '../../API/define-api'
import Axios from 'axios'
import './manage-order.styles.scss'

class ManageOrder extends Component {
  constructor() {
    super();

    this.state = {
      listOrder: [],
      showCancel: false,
      Reason: '',
      OrderID: null
    }
  }

  componentDidMount() {
    var user = this.props.user;
    var me = this;
    if (user) {
      var link = user ? (API.allorder + user.accountID) : API.allorder;
      Axios.get(link).then(res => {
        if (res.status === 200) {
          if (res.data.success) {
            me.setState({
              listOrder: res.data.data
            });
          } else {
            alert("error occurr");
          }
        } else {
          alert("error internet");
        }
      });
    } else {
      window.location.href = "/";
    }
  }

  converDate = (date) => {
    var d = new Date(date);
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
  }

  showReason = (id, e) => {
    this.setState({
      showCancel: true,
      OrderID: id
    })
  }

  hideReason = () => {
    this.setState({
      showCancel: false,
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  cancelOrder = (e) => {
    e.preventDefault();
    var data = {
      OrderID: this.state.OrderID,
      ReasonCancel: this.state.Reason
    }
    var link = API.cancelorder;
    var me = this;
    Axios.post(link, data).then(res => {
      if (res.status === 200) {
        if (res.data.success) {
          var arraOrder = me.state.listOrder;
          for (var i = 0; i < arraOrder.length; i++) {
            if (arraOrder[i].orderID === data.OrderID) {
              arraOrder[i].status = 5;
              arraOrder[i].statusName = "Canceled";
              arraOrder[i].reasonCancel = data.ReasonCancel;
            }
          }
          me.setState({
            listOrder: arraOrder,
            showCancel: false,
          })
        } else {
          alert("error occurr");
        }
      } else {
        alert("error internet");
      }
    })
  }

  render() {
    return (
      <div className="container">
        <h2>Manage Order</h2>
        <table className="table table-order-manage disable-blacken">
          <thead>
            <tr>
              <th>Code Order</th>
              <th>Date Order</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.listOrder.length < 0 ? null :
                (
                  this.state.listOrder.map(x => (
                    <tr key={x.orderID}>
                      <td>{x.orderCode}</td>
                      <td>{this.converDate(x.orderDate)}</td>
                      <td>{x.totalAmount}$</td>
                      <td className={x.statusName}>{x.statusName}</td>
                      <td>
                        <span className="view-order" title="view order detal"><i className="far fa-eye"></i></span>
                        {x.status == 1 ? (<span className="cancel-order" title="cancel order" onClick={this.showReason.bind(null, x.orderID)}><i className="fas fa-window-close cancel-order"></i></span>) : 
                        <span className="space-white"></span>
                        }
                      </td>
                    </tr>
                  )))
            }
          </tbody>
        </table>

        {
          !this.state.showCancel ? null :
            <div className="">
              <div className="abs-class"></div>
              <div className="reason-cancel">
                <form onSubmit={this.cancelOrder}>
                  <div className="row">
                    <div className="label"><h4>Reason Cancel:</h4></div>
                    <textarea className="form-control text-area" name="Reason" rows="3"
                      onChange={this.handleChange} required></textarea>
                  </div>
                  <div className="row on-right">
                    <button type="submit" className="btn btn-primary btn-cancel-order">Cancel Order</button>
                    <button type="button" className="btn btn-danger" onClick={this.hideReason}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default ManageOrder;