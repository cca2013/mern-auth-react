
import React, { useState, useEffect,createContext } from "react";
import { createBrowserHistory as history} from 'history';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import productService from '../../services/productService';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import "../../styles.css";

function deleteProductForm(props) 
{ 
var title =props.location.state.title;

const [values, setValues] = useState({id: ''});

  const set = id => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [id]: value }));
    }
  };

 

		
 const saveFormData = async (req,res) => {

   const response = await fetch('/api/removeProduct', {
      method: 'POST',
	  headers:
		{'Accept':'application/json',
		'Content-Type':'application/json'},
      body: JSON.stringify(values)
    }).then(res => {
		if (res.ok) return res.json()  
		return alert("deletion not posted")
			})
		.then(response => {
			alert(response)
		
  });
		
 
		
  }

   const goToProducts =  async()  => {		
    props.history.push({
    pathname: `/products`,
    state: {title:title}
})
 }

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    
      await saveFormData();
     // alert('Your registration was successfully submitted!');
      setValues({
       id: '' 
      });
  
  }
  
  const redirectButtonClick = () => {
  //calculate your data here
  //then redirect:
  this.props.history.push({ //browserHistory.push should also work here
    pathname: '/products',
    state: {title: title}
  }); 
}


    return ( 
    <form onSubmit={onSubmit}>
      <h2>Product id, paste here:</h2>

      <label>ID:</label>
      <input 
        type="text" required
        value={values.id} onChange={set('id')} 
      />

     
      <button type="submit">Submit</button>
	 <button onClick={goToProducts}>Go back</button>
    </form>
  );
 
}



export default deleteProductForm;
