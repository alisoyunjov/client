import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css'
import AuthService from "../../services/authService";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem} from 'reactstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if(user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    if(window.confirm("You will be logged out")){
      AuthService.logout();
      window.location.reload();
    }
    else{
      window.reload();
    }
  }

  state = { clicked: false }
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render(){
    const { currentUser } = this.state;
    
    return (
      <div>
      <nav className="navbar navbar-expand navbar-dark">
        <Link to={"/home"} className="navbar-brand">
              <h1>Decode Cure</h1>
        </Link>
        {currentUser && currentUser.role === 'admin' && (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/ordersList"} className="nav-link">
                <h5>Orders</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/submissions"} className="nav-link">
                <h5>Submissions</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/finishedOrders" className="nav-link">
                <h5>Finished Orders</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vendors" className="nav-link">
                <h5>Vendors</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                <h5>Profile</h5>
              </Link>
            </li>
          </div>
        )}

        {currentUser && currentUser.role === 'scientist' && (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/makeOrder"} className="nav-link">
                <h5>Make Order</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/viewOrders"} className="nav-link">
               <h5> Order History</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/allOrders" className="nav-link">
                <h5>Company Orders</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                <h5>Profile</h5>
              </Link>
            </li>
          </div>
        )}

        {currentUser && (
          <div className="navbar-nav ml-right">
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={this.logOut}>
                <button className="btn" id="button">Log out</button>
              </a>
            </li>
          </div>
        )}

        {!currentUser && (
          
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/Signup"} className="nav-link">
              <button className="btn" id="button">Login</button>
              </Link>
            </li>
          </div>
        )}
      </nav>
    </div>

    );
  }
}

export default Navbar;
