import React from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import productAddForm from './components/addproducts/productAddForm';
import App1 from './components/products/App1';
const Routes = () => (
    <Router>
            <Route exact path="/addproducts" component={productAddForm} />
            <Route path="/products" component={App1} />
    </Router>
);

export default Routes;