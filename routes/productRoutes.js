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
  
  
    app.post("/api/getProduct", async (req, res) => {
    const {id} = req.body;
	
    let product = await Product.find({_id:id}).then(product => {
			res.json(JSON.stringify(product))
			
		//	console.log('This the found product after the call:'+product)
			})
			.catch(error => res.json('Wrong id. Product not found try again.  '));
			
		
 //return res.status(200).send(JSON.stringify(product))
    

  });
  
    app.post("/api/saveProduct", async (req, res) => {
    //let product = {'_id':'604e623971943a0015675e41','user':'604df9b41b38c127d8a2b960','name':'konstantinos','image':'https://img00.deviantart.net/cfa0/i/2015/310/d/b/tesla_coil_cambridge_teslathon_2015_by_teslaextreme-d9fr5dp.jpg'}
	let product = req.body
    const id=product._id
    const result = await Product.findByIdAndUpdate(id,product).then(result => {
			res.json('Success.Product saved.')
			console.log("this product was saved:"+JSON.stringify(product))
			})
			.catch(error => res.json('Wrong id. Failure to update product.  '))

  });
}

