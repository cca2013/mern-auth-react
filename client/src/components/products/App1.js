import React, { useState, useEffect,createContext } from "react";
import { createBrowserHistory as history} from 'history';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import productService from '../../services/productService';
import { useHistory } from "react";
import {Redirect} from "react-router-dom";

import axios from 'axios';

const initialFormData = Object.freeze({
  id: ""
});
var counter=0;
var _id='60454cbcac6a6c1d449fd455';



var arrayOfIds=[];
//var test={_id:'', name:'', description:'', user:'', image:''};
function App1(props) {
const [products, setproducts] = useState(null);
const [product, setProduct] = useState(null);

var count=0;
var title =props.location.state.title;


	useEffect(() => 
	{
		if(!products) {
			getProducts();
			//title =props.location.state.title;
		}
    })

//send user id to backend and receive data to render
  const getProducts = async(value) => {	
    let res = await productService.getAll({value:title});
    setproducts(res);
  }
  
 const deleteProductData =  async() => {	
    const response =  await fetch('/api/removeProduct',{
			method:'POST',
		//headers:
	//	{'Accept':'text',
		//'Content-Type':'text'},
		body: test
	});

    if (response.status == 200) {
      alert(`Request succeded: ${response.status}`); 
    }
  }
 
 function increaseCount(id) {
count=count+1
alert(id);
}
 
 const goToDeleteDataForm =  ()  => {		

   props.history.push({
    pathname: `/deleteproducts`,
    state: {title:title}
})
 
 }
 
  const deleteData =  async()  => {		
  //counter=counter+1;
   try{
   const res = await axios.post('/api/removeProduct',{_id});

        if(res.data.success){
            alert(res.data.msg);
			
        }
    }
    catch(err){
        console.error(err);
	}

  }
  
const routeChange = (value) =>
{ 	
    props.history.push({
    pathname: `/addproducts`,
    state: {title:value}
})   
}
  


  const renderProduct = product => 
  {
	
    return (	
	
		<div> 
			<p>
				<button
					style=
					{{
						width: "150px",
						borderRadius: "3px",
						letterSpacing: "1.5px",
						marginTop: "1rem"
					}}    
					onClick={goToDeleteDataForm}
					className="btn btn-large waves-effect waves-light hoverable blue accent-3"
				>
				Delete
				</button> 
			</p>
		<p> </p>
			<li key={product.user} >
				<p>---------------------------------------------------------------</p>
				<p >ΕΙΔΟΣ:       		{product.name}</p>
				<p ><img src=    		{product.image} width='300' height='300' /></p>
				<p >ΠΕΡΙΓΡΑΦΗ:   		{product.description}</p>			
				<p >ΚΩΔΙΚΟΣ ΠΡΟΙΟΝΤΟΣ: 	{product._id}</p>
			</li>
		</div>
    );//return of render product
	
  };//render product


//return RENDER of App1
  return (

    <div >
	
		 <button
              style={{
                width: "200px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}     
              onClick={routeChange.bind(this,title)}

              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
          Add New Product
          </button>
	
		  <button
				style={{
					width: "200px",
					borderRadius: "3px",
					letterSpacing: "1.5px",
					marginTop: "1rem"
				}}     
				onClick={goToDeleteDataForm}
				className="btn btn-large waves-effect waves-light hoverable blue accent-3"
			>
							
			Delete by ID
			</button> 
					
						
     	
	 <ul >
	
		<h3><p>  ΠΡΟΙΟΝΤΑ </p>  <p>ΧYΣΤΗ:  {title} </p></h3>
        {

			(products && products.length > 0) ? 
				products.map(product => 
				
				( 		
					<div>   	
					
						<li key={product.user} >							
							<p>---------------------------------------------------------------</p>
							<p>ΑΑ: {count=count+1}</p>
							<p >ΕΙΔΟΣ:   			{product.name}</p><p></p>						
							<p ><img src=			{product.image} width='300' height='300' /></p>
							<p >ΠΕΡΙΓΡΑΦΗ:  		{product.description}</p>	
							<p> </p>
							<p >ΚΩΔΙΚΟΣ ΠΡΟΙΟΝΤΟΣ:</p><p> 	{product._id}	</p>	
						</li>
					</div>
				
				)//map rendering 

		  )//map 
		  : 
			(
			<p>No products found</p>	
		 
			)
		}
      </ul>
    </div>
  );//end return of App1
}//end App1

export default App1;

