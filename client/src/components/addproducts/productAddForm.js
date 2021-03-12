
import React, { useState, useEffect,createContext } from "react";
import { createBrowserHistory as history} from 'history';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import productService from '../../services/productService';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import "../../styles.css";

function productAddForm(props) { 

var title=props.location.state.title;

const [product, setProduct,productuser,setProductUser] = useState({ 
    name: '', description: '', user: title, image: '' 
  });

const handleChange = (event) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

 const set = name => {
    return ({ target: { product } }) => {
      setProduct(oldProduct => ({...oldProduct, [name]: product }));
    }
  };
  
    
const routeChange = (value) =>
{ 	
    props.history.push({
    pathname: `/products`,
    state: {title:value}
})   
}
    
  
const saveFormData =  async() => {
		 props.history.push({
    pathname: `/products`,
    state: {title:product['user']}
})   
    const response =  await fetch('/api/product',{
			method:'POST',
		headers:
		{'Accept':'application/json',
		'Content-Type':'application/json'},
		body: JSON.stringify(product)
	});

    if (response.status !== 200) {
      alert(`Request failed: ${response.status}`); 
    }
  }

		 
    return (	
		<form onSubmit={saveFormData}>
 
       <h2>Add your product</h2>

      <label>Name*:</label>
	  
	   <input 
        type="input"  name="name" id="name"
		value={product.name }  onChange={(e) => handleChange(e)}
		
      />


      <label>Description*:</label>
   
	   <input 
        type="input"  name="description" id="description"
		value={product.description } onChange={(e) => handleChange(e)}
      />

	   <input 
        type="hidden"  name="user" id="user"
        value={product.user} onChange={(e) => handleChange(e)} />
        
	    <label>Image*:</label>
	   
	   <input 
        type="input"  name="image" id="image"
		value= {product.image } onChange={(e) => handleChange(e)} />


      <button type="submit">Submit</button>
    
</form>	  
    );
  
 
}


export default productAddForm;
