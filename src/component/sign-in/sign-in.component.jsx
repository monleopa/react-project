import React, { Component } from 'react';
import './sign-in.styles.scss'

class SignUp extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="container center sign-in">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-7">
                <img src={process.env.PUBLIC_URL + '/assets/login_bg.png'} width="80%"/>
              </div>
              <div className="col-md-5">
                <div className="center title"><b>LOG IN</b></div>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <input className="form-control" type="email" name="Email" placeholder="Email" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 d-flex">
                    <input className="form-control" type="password" name="Password" placeholder="Password" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 d-flex">
                    <input className="form-control btn btn-primary" type="submit" value="Log In" />
                  </div>
                </div>

                <hr className="line" />
                <div className="row">
                  <div className="col-md-12 dont-account">
                    <b>if you haven't account</b>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-success form-control">CREATE NEW ACCOUNT</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    )
  }
}

export default SignUp;