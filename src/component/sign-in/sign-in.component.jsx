import React, { Component } from 'react';
import './sign-in.styles.scss'

class SignUp extends Component {
  constructor() {
    super();

    this.state =  {
      Email: null,
      Password: null
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = async(e) => {
    e.preventDefault();
    var me = this;
    var result = await this.props.login(this.state);
    console.log(result);
    if( result === true) {
      if(this.props.linkBefore !== window.location.href) {
        window.location.href = this.props.linkBefore;
      } else {
        window.location.href = "/";
      }
      
    } else {
      me.setState = {
        errorLogin: result
      }
    }
  }

  render() {
    return (
      <div className="container center sign-in">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-7">
                <img src={process.env.PUBLIC_URL + '/assets/login_bg.png'} width="80%" alt="img"/>
              </div>
              <div className="col-md-5">
                <div className="center title"><b>LOG IN</b></div>
                <form onSubmit={this.handleLogin}>
                  <div className="row">
                    <div className="col-md-12 d-flex">
                      <input className="form-control" type="email" name="Email"
                        placeholder="Email" onChange={this.handleChange} required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 d-flex">
                      <input className="form-control" type="password" name="Password"
                        placeholder="Password" onChange={this.handleChange} required />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 d-flex">
                      <input className="form-control btn btn-primary" type="submit" value="Log In" />
                    </div>
                  </div>
                </form>
                <hr className="line" />
                <div className="row">
                  <div className="col-md-12 dont-account">
                    <b>if you haven't account</b>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <a href="/signup">
                      <button className="btn btn-success form-control">CREATE NEW ACCOUNT</button>
                    </a>
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