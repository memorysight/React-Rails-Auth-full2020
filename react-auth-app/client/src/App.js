import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";

import axios from 'axios';
import decode from 'jwt-decode';

class App extends Component {
  state = {
    currentUser: {},
  }
  componentDidMount() {  
    /*
    1. check if there is token saved in localStorage at "jwt"
    2. if there is, decode it and save the object to currentUser state
    */
      const token = localStorage.getItem('jwt')
      if (token){
        this.setState({
          currentUser:decode(token) 
        })


      }

  }

  handleLogin = async (data)=> {
    /* 
    1. submit form data to appropriate endpoint
    2. Retrieve token from response object
    3. save token to local storage at key 'jwt'
    4. decode token and set currentUser state
    */
   const res = await axios.post('http://localhost:3000/auth/login', data)
    const token = res.data.token
    localStorage.setItem("jwt", token)
    this.setState({
      currentUser: decode(token)
    })

  }


  handleLogout = ()=>{
    /*
    1. remove jwt from local storage
    2. clear currentUser in state to empty object
    */

    localStorage.removeItem('jwt')
    this.setState({
      currentUser: {}
    })
  }

  handleSignUp = async  (data)=> {
    /*
    1. submit form data to the appropriate endpoint
    
    2. Retrieve token from response object
    3. save token to local storage at key 'jwt'
    4. decode token and set currentUser state
    */

    const res = await axios.post('http://localhost:3000/users', data)
    const token = res.data.token
    localStorage.setItem("jwt", token)
    this.setState({
      currentUser: decode(token)
    })
  }
  

  render() {
    const {currentUser} = this.state
    const userIsLoggedIn = currentUser.user_id
    return (
      <Router>
        <div className="App">

        {userIsLoggedIn && <Redirect to="/home" />}


      
          <header>
          {this.state.currentUser.user_id ?
             <a onClick={this.handleLogout}> Log Out </a > :
              <nav> <Link to='/signup'>Sign Up</Link> <Link to='/login'>Log in</Link></nav> }

            {/* <nav> <Link to='/signup'>Sign Up</Link> <Link to='/login'>Log in</Link>  <a  onClick={this.handleLogout}> Log Out </a >  </nav> */}
            <div> {this.state.currentUser.user_id ? `Hello ${currentUser.username}` : null} </div>
            <h1>
              <Link
                to="/"
                onClick={() =>
                  this.setState({
                    teacherForm: {
                      name: "",
                      photo: ""
                    }
                  })
                }
              >
                Auth App
              </Link>
            </h1>
          </header>
          <Switch>
            <Route exact path="/login" render={(props) => <LoginForm {...props} handleLogin={this.handleLogin} />} />
            <Route exact path="/signup" render={() => <SignUpForm handleSignUp={this.handleSignUp} />} />
            <Route exact path="/home" render={()=><div>this is the homepage</div>} />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;