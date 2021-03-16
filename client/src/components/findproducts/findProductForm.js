
import React, { useState, useEffect,createContext } from "react";
import { createBrowserHistory as history} from 'history';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import productService from '../../services/productService';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import "../../styles.css";


function findProductForm(props) 
{ 
var title =props.location.state.title;
var product1={};
const [values, setValues] = useState({id: ''});
const [product, setProduct] = useState({_id:'',name:'',description:'',user:title,image:''});


  const set = id => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [id]: value }));
    }
  };

  const set1 = name => {
    return ({ target: { value } }) => {
      setProduct(oldProduct => ({...oldProduct, [name]: value }));
    }
  };
		
		

	
	
 const getProductData = async (req,res) => {

  const result = await fetch('/api/getProduct', {
      method: 'POST',
	   headers:
		{'Accept':'application/json',
		'Content-Type':'application/json'},
			body: JSON.stringify(values)					
  }).
				then(res => {
				if (res.ok) return res.json()  
					return alert("Product found.")
				}).
				then(result => {
					//alert("returned from api call json = "+result)
					setProduct(product)
					product1=result;
					//alert("product1 var= "+product1)
					//alert(JSON.stringify(product))
					goToEdit()
					})

 }
 

   const goToEdit =  async()  => {		
    props.history.push({
    pathname: `/editproducts`,
    state: {title:product1}
})
 }

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    
      await getProductData();    
      setValues({
       id: '' 
      });
  
  }
 

    return ( 
	
		<div>

	
    <form onSubmit={onSubmit}>
      <h2>Product id, paste here:</h2>
	  
      <label>Id:</label>
      <input 
        type="text" required
        value={values.id} onChange={set('id')} 
      />

     
      <button type="submit">Submit</button>
	
    </form>

 


</div>
 );
 
}



export default findProductForm;
