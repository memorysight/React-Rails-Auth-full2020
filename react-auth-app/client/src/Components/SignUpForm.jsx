import React, { Component } from "react";
import { Link } from "react-router-dom";


class SignUpForm extends Component {
  state = {
    password: "",
    username: "",
    email: "",
    passwordConfirm: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    /*
    1. check that password and password confirm match; alert the user and prevent submission if they don't
    2. Otherwise, call the handleSignup from props with the form data 
    */
    if (this.state.passwordConfirm !== this.state.password){

        alert('Your passwords dont match')
           return this.setState({
            password: '',
            passwordConfirm: ''
        })
    }
   this.props.handleSignUp(this.state)

  }

  render() {
    return (
      <div className="auth-container">
        <h2>Sign up</h2>
        
        <hr />
        <form
          onSubmit={this.handleSubmit}
        >
          <p>Username:</p>
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
            <p>Email:</p>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <p>Password:</p>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
            <p>Confirm Password</p>
           <input
            name="passwordConfirm"
            type="password"
            value={this.state.passwordConfirm}
            onChange={this.handleChange}
          />

          <hr />
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;