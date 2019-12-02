import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './header.styles.scss'

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isShow: false
    }
  }
  logout = () => {
    this.props.logout();
  }

  toggleShow = (e) => {
    var show = this.state.isShow;
    this.setState({
      isShow: !show
    })
  }

  hideToggle = () => {
    this.setState({
      isShow: false
    })
  }

  onSignIn = (e) =>{
    window.location.href = "/signin"
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <div className="logo bg-dark">
            NDANH
          </div>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/category/shirt"><b>SHIRT</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/coat"><b>COAT</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/pants"><b>PANTS</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/dress"><b>DRESS</b></Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 form-search">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
          </form>
          {
            this.props.isLogin ?

              <span>
                <span className="fix-signin">
                  <Link to="/order" className="signin cart">
                    <span className="number-cart">{this.props.order ? this.props.order.listOrderDetail.length : 0}</span>
                    <i className="fas fa-shopping-cart"></i>
                  </Link>
                </span>
                <span className="fix-signin disable-blacken">
                  <i className="fas fa-ellipsis-h more" onClick={this.toggleShow}></i>
                  {
                    this.state.isShow ?
                      (<div id="choice-user" className="choice-user">
                        <Link to="#">
                          <div className="select-option">
                            <i className="fas fa-user"></i> Change Password
                        </div>
                        </Link>
                        <Link to="/manageorder" onClick={this.hideToggle}>
                          <div className="select-option">
                            <i className="fas fa-clipboard-list"></i> Manage Order
                        </div>
                        </Link>

                        <Link to="#" onClick={this.logout}>
                          <div className="select-option">
                            <i className="fas fa-sign-out-alt"></i> Sign Out
                        </div>
                        </Link>
                      </div>) : <div></div>
                  }
                </span>
              </span>
              :
              <span className="fix-signin btn-sign-in">
                <button className="btn btn-dark" onClick={this.onSignIn}>SIGN IN</button>
              </span>
          }

        </div>
      </nav>
    )
  }
}

export default Header