import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('/display');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        { this.renderAlert() }
        <div className="form">
        <form onSubmit={this.login}>
          <h1>Login</h1>
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
              value="Log In"
            >Log In</Button><br/>
            <Link to="/register">Register</Link>
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
