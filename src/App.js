import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignUp from './component/sign-up/sign-up.component'
import SignIn from './component/sign-in/sign-in.component'
import Header from './component/header/header.component'
import ListItem from './component/list-item/list-item.component'
import DetailItem from './component/detail-item/detail-item.component'
import ManageItem from './component/manage-item/manage-item.component'
// import Slider from './component/slider/slider.component'
import API from './API/define-api'
import Axios from 'axios';
import { withCookies } from 'react-cookie'

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
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
          }
        }
      });
    }

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

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header isLogin={this.state.user != null} logout={this.logout} />

          <Switch>

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
              render={(props) => <DetailItem {...props} user={this.state.user} />}
            />

            <Route
              path="/manageitem"
              render={(props) => <ManageItem />}
            />

            <Route
              path="/"
              render={(props) => <ListItem {...props} category={"new"}/>}
            />
          </Switch>
        </div>
      </BrowserRouter>
    )
  };
}

export default withCookies(App);
