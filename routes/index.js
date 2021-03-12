const express = require('express');

const router = express.Router();
const Product = require('../models/products');
router.post'/api/product',  async (req, res) => {
	
	 const products= await Product.find({}).lean();
res.render('App1', {products});
});

router.get('/' , async (req, res) => {
  try {
    products= await Product.find({}).lean();
console.log(products);
    res.render('App1',{products});
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
