const express = require("express");
const mongoose = require('mongoose');
const Product = mongoose.model('products');
const User= mongoose.model('users');
const router = express.Router();
var FormData = require('form-data')



module.exports = (app) => {

  app.post(`/api/product/:user`,async (req, res) => {
	console.log(req.body.value);
	 const userid=req.body.value;
     let products = await Product.find({user:userid});
	 //console.log(products);
    return res.status(200).send(products);
  });
  
 

  app.post(`/api/product`, async (req, res) => {
    let product = await Product.create(req.body)
	product.user=req.body.user;
	console.log("create here:"+product.user);
	product.save()
        .then(product => {
            res.status(200).send(product.user);
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
  })

  app.put(`/api/product/:id`, async (req, res) => {
    const {id} = req.params;

    let product = await Product.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      product
    })

  });
 
  app.post("/api/removeProduct", async (req, res) => {
		var {id} = req.body; 
		console.log("to be deleted this id:"+id);
		
			let product =await Product.findByIdAndRemove(id)
			.then(result => {
			res.json('Success.Product deleted!')
			})
			.catch(error => res.json('Wrong id. Failure to delete.  '));
			
			console.log("deleted id:"+id); 
			
		
        
	
  });
}

