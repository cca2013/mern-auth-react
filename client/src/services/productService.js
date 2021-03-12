import axios from 'axios';

export default {
	
	
	
	
		
  getAll: async (value) => {
    let res = await axios.post(`/api/product/:user`,value);
    return res.data || [];
  },

  
  createProduct: async (product) => {	  
	 let res =    await axios.post(`/product`,product);
	 return res.data || [];
  },
   
  deleteProduct: async (product) => {	
const headers=	{'Accept':'string',
	 'Content-Type':'string'};
	 
	 let res =    await axios.post(`/api/removeProduct`,headers, product);
	
	 return res.data || [];
  }
 
}