import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './header.styles.scss'

class Header extends Component {

  logout = () => {
    this.props.logout();
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
              <Link className="nav-link" to="#"><b>SHIRT</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#"><b>COAT</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#"><b>PANTS</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#"><b>DRESS</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manageitem"><b>ManageItem</b></Link>
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
                  <span class="number-cart">0</span>
                  <i class="fas fa-shopping-cart"></i>
                </Link>
              </span>
              <span className="fix-signin">
                <Link to="#" className="signin" onClick={this.logout}><i class="fas fa-sign-out-alt"></i></Link>
              </span>
            </span>
            :
            <span className="fix-signin">
              <Link to="/signin" className="signin"><i class="fas fa-user"></i></Link>
            </span>
          }
         
        </div>
      </nav>
    )
  }
}

export default Header