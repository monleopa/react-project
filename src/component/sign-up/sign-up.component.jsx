import React, { Component } from 'react';
import './sign-up.styles.scss'

class SignUp extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="container center sign-up">
        <div className="center title"><b>SIGN UP</b></div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-4 d-flex">
            <div className="fix-label"> First Name </div>
            <input className="form-control" />
          </div>
          <div className="col-md-4 d-flex">
            <div className="fix-label"> Last Name </div>
            <input className="form-control" />
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 d-flex">
            <div className="fix-label"> Email </div>
            <input className="form-control" type="email" />
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 d-flex">
            <div className="fix-label"> Address </div>
            <input className="form-control" />
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 d-flex">
            <div className="fix-label"> Mobile </div>
            <input className="form-control" />
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 d-flex">
            <div className="fix-label"> Password </div>
            <input className="form-control" type="password" />
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 d-flex">
            <div className="fix-label"> Password Confirm </div>
            <input className="form-control" type="password" />
          </div>
          <div className="col-md-2"></div>
        </div>

        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 d-flex">
            <div className="fix-label"></div>
            <input className="btn btn-primary form-control" type="submit" value="Sign Up"/>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    )
  }
}

export default SignUp;