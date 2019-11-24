import React, { Component } from 'react';
import './header.styles.scss'

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <div className="logo bg-dark">
            NDANH
          </div>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">SHIRT</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">COAT</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">PANTS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">DRESS</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" />
            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
          </form>

          <a href="#"><span className="glyphicon glyphicon-user"></span></a>
        </div>
      </nav>
    )
  }
}

export default Header