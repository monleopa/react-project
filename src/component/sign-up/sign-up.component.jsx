import React, { Component } from 'react';
import './sign-up.styles.scss'
import Axios from 'axios';
import API from '../../API/define-api';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      FirstName: null,
      LastName: null,
      Email: null,
      Address: null,
      Mobile: null,
      Password: null,
      PasswordConfirm: null,

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var me = this;
    const account = {
      ...this.state
    };

    if (this.state.Password !== this.state.PasswordConfirm) {
      me.setState({
        errorSignUp: "Password does not match",
      });
    } else {
      Axios.post(API.signup, account)
      .then(res => {
        if (res.status === 200) {
          if (res.data.success) {
            window.location.href = "/signin"
          } else {
            if (res.data.errorCode === 1) {
              me.setState({
                errorSignUp: res.data.error
              });
            }
          }
        }
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="container center sign-up">
        <div className="center title"><b>SIGN UP</b></div>
        {
          this.state.errorSignUp ?
            <div className="center error">{this.state.errorSignUp}</div>
            : null
        }
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-4 d-flex">
              <div className="fix-label"> First Name </div>
              <input className="form-control" name="FirstName" onChange={this.handleChange} required />
            </div>
            <div className="col-md-4 d-flex">
              <div className="fix-label"> Last Name </div>
              <input className="form-control" name="LastName" onChange={this.handleChange} required />
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex">
              <div className="fix-label"> Email </div>
              <input className="form-control" type="email" name="Email" onChange={this.handleChange} required />
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex">
              <div className="fix-label"> Address </div>
              <input className="form-control" name="Address" onChange={this.handleChange} />
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex">
              <div className="fix-label"> Mobile </div>
              <input className="form-control" name="Mobile" onChange={this.handleChange} />
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex">
              <div className="fix-label"> Password </div>
              <input className="form-control" type="password" name="Password" onChange={this.handleChange} required />
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex">
              <div className="fix-label"> Password Confirm </div>
              <input className="form-control" type="password" name="PasswordConfirm" onChange={this.handleChange} required />
            </div>
            <div className="col-md-2"></div>
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex">
              <div className="fix-label"></div>
              <input className="btn btn-primary form-control" type="submit" value="Sign Up" />
            </div>
            <div className="col-md-2"></div>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp;