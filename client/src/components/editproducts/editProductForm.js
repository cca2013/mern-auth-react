
import React, { useState, useEffect,createContext } from "react";
import { createBrowserHistory as history} from 'history';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import productService from '../../services/productService';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import "../../styles.css";

var product1 ={}
var array=[]


function editProductForm(props) 
{ 

product1=props.location.state.title;
//remove [] from the passed object

const product1_Str=JSON.stringify(product1)

const removed = product1.substring(1, product1.length-1);

const passed_obj=JSON.parse(removed)


const [values, setValues] = useState({id: ''});
const [product, setProduct] = useState(passed_obj)






const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const set = id => {
    return ({ target: { value } }) => {
      setValues(oldValues => ({...oldValues, [id]: value }));
    }	
  }
  
  
	const saveProductData = async (req,res) => {
   //alert(JSON.stringify(product))
   const response = await fetch('/api/saveProduct', {
      method: 'POST',
	  headers:
		{'Accept':'application/json',
		'Content-Type':'application/json'},
      body: JSON.stringify(product)
    }).
		then(result => {
		if (result) return result.json()  
		return alert("Product saved succesfully.")
			})
		.then(result => {
			alert(result)
		});
		
		goToProducts();
		
  }

   const goToProducts =  async()  => {		
    props.history.push({
    pathname: `/products`,
    state: {title:product.user}
})
 }

 
  
    const onSubmit = async (event) => {
     	event.preventDefault()	
		//alert(product.name)
		await saveProductData();     
  
  
  }
  
  const redirectButtonClick = () => {
  //calculate your data here
  //then redirect:
  this.props.history.push({ //browserHistory.push should also work here
    pathname: '/products',
    state: {title: product.user}
  }); 
};
    
	
	
	return ( 
	
	<div>
	<form onSubmit={onSubmit}>
       <h2>Edit product</h2>
       <label>Name*:</label>	
	   <input 
        type="input"  name="name" id="name"
		value={product.name}  onChange={(e) => handleChange(e)}
		
       />
      <label>Description*:</label>
	   <input 
        type="input"  name="description" id="description"
		value={product.description}
		onChange={(e) => handleChange(e)}
       />
	   <input 
        type="hidden"  name="user" id="user"
        value={product.user} onChange={(e) => handleChange(e)} />        
	   <label>Image*:</label>	   
	   <input 
        type="input"  name="image" id="image"
		value= {product.image} onChange={(e) => handleChange(e)} />
      <button type="submit">Submit</button>
    
</form>	  
</div>
 );
	
}



export default editProductForm;
