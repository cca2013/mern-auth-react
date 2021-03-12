import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/listnotes`);
    return res.data || [];
  }
}