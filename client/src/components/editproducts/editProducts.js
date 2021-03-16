
import React from "react";
import ReactDOM from 'react-dom';


import { createBrowserHistory as history} from 'history';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import productService from '../../services/productService';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import "../../styles.css";


class editProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name,description:this.props.description,user:this.props.user,image:this.props.image };
  }
  myChangeHandler = (event) => {
    this.setState({name: event.target.value});
  }
  render() {
    return (
      <form>
      <h1>Product details: </h1>
      <p>Edit name:</p>
      <input
        type='text' value={this.state.name}
        onChange={this.myChangeHandler}
      />
      </form>
    );
  }
}

ReactDOM.render(<editProduct />, document.getElementById('root'));


export default editProducts;