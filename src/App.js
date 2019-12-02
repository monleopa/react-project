import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignUp from './component/sign-up/sign-up.component'
import SignIn from './component/sign-in/sign-in.component'
import Header from './component/header/header.component'
import ListItem from './component/list-item/list-item.component'
import DetailItem from './component/detail-item/detail-item.component'
import Order from './component/order/order.component'
import CheckOut from './component/checkout/checkout.component'
import Category from './component/category/category.component'
import CategoryItem from './component/category-item/category-item.component'
import ManageOrder from './component/manage-order/manage-order.component'
// import Slider from './component/slider/slider.component'
import API from './API/define-api'
import Axios from 'axios';
import { withCookies } from 'react-cookie'

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
      order: null,
      orderPay: null,
    }
  }

  componentDidMount = () => {
    const { cookies } = this.props;
    const user = cookies.cookies.user;

    var me = this;
    if (user) {
      Axios.post(API.checklogin, JSON.parse(user)).then(res => {
        if (res.status === 200) {
          if (res.data.data) {
            me.setState({
              user: JSON.parse(user)
            });

            me.getOrderByID(me.state.user.accountID);
          } else {
            alert("error");
          }
        }
      });
    }
  }

  getOrderByID = (id) => {
    var me = this;
    Axios.get(API.getOrder + id).then(res => {
      if (res.status === 200) {
        if (res.data.success) {
          me.setState({
            order: res.data.data
          })
        } else {
          alert("error");
        }
      }
    });
  }

  orderItem = (idItem, quantity) => {
    var me = this;

    var detailItem = {
      DetailItemID: idItem,
      Quantity: quantity,
      OrderID: this.state.order.orderID
    }

    Axios.post(API.order, detailItem).then(res => {
      if (res.status === 200) {
        if (res.data.success) {
          var listOrder = this.state.order.listOrderDetail;
          listOrder.push(detailItem);
          var order = this.state.order;
          order.listOrderDetail = listOrder
          me.setState({
            order: order
          })
        } else {
          alert("Error");
        }
      }
    });
  }

  login = async (user) => {
    var me = this;

    let result = await Axios.post(API.signin, user).then(res => {
      if (res.status === 200) {
        if (res.data.success) {
          me.props.cookies.set('user', res.data.data);
          return true;
        } else {
          if (res.data.errorCode === 2) {
            return res.data.error;
          }
        }
      }
    });

    return result;
  }

  logout = () => {
    this.props.cookies.remove('user');
    this.setState({
      user: null,
    });
  }

  saveCurrentListOrderDetail = (listCurrent, totalAmount) => {
    this.setState({
      currentListOrderDetail: listCurrent,
      totalAmount: totalAmount
    })
  }

  updateOrderNew = (listCurrent, totalAmount, productAmount, discount) => {
    var data = {
      TotalAmount: totalAmount,
      ProductAmount: productAmount,
      ListOrderDetail: listCurrent,
      OrderID: this.state.order.orderID,
      AccountID: this.state.user.accountID,
      SaleCodeID: discount ? discount.saleCodeID : null,
      SaleCodeType: discount ? discount.saleCodeType : 1,
      SaleCodeValue: discount ? discount.saleCodeValue : 100,
    }

    this.setState({
      orderPay: data
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header isLogin={this.state.user != null} logout={this.logout} order={this.state.order} />
          <Switch>
            <Route
              path="/checkout"
              render={(props) => <CheckOut {...props}/>}
            />
            <Route
              path="/signin"
              render={(props) => <SignIn {...props} login={this.login} linkBefore={window.location.href} />}
            />
            <Route
              path="/signup"
              render={(props) => <SignUp />}
            />
            <Route
              path="/item"
              render={(props) => <DetailItem {...props} user={this.state.user} orderItem={this.orderItem} />}
            />
            <Route
              path="/category"
              render={(props) => <Category match={props}/>}
            />

            <Route
              path="/categoryitem"
              render={(props) => <CategoryItem match={props}/>}
            />

            <Route
              path="/manageorder"
              render = {(props) => <ManageOrder user={this.state.user}/>}
            />

            <Route
              path="/order"
              render={(props) => <Order {...props} user={this.state.user} 
                saveCurrentListOrderDetail={this.saveCurrentListOrderDetail}
                updateOrderNew={this.updateOrderNew}/>}
            />
            <Route
              path="/"
              render={(props) =>
                <ListItem {...props} category={"new"} />
              }
            />
          </Switch>
        </div>
      </BrowserRouter>
    )
  };
}

export default withCookies(App);
