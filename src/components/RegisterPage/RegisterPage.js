import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';



class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const request = new Request('api/user/register', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      // making the request to the server to post the country
      fetch(request)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <div className="form">
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              
              <TextField
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Username"

                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
             
              <TextField
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Password"

                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
          <br/>
            <Button size="small" variant="raised" color="primary"
              type="submit"
              name="submit"
              value="Register"
            >Register</Button><br/>
            <Link to="/home">Cancel</Link>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default RegisterPage;

