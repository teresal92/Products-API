// const axios = require('axios');
const pool = require('../db')
const { API_KEY } = require('../config.js');

module.exports = {
  // Retrieves list of products
  getProducts: async (req, res) => {
    try {
      const products = await pool.query('SELECT * FROM products;');
      res.json(products.rows[0]);
    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  },

  // Returns all product level information for a specified product id.
  getProductInfo: async (req, res) => {
    // const { productId } = req.params;
    // try {
    //   const products = await pool.query('SELECT * FROM products', [productId]);
    //   res.json(products.rows[0]);
    // } catch (err) {
    //   res.status(404).send(`Error retrieving product list: ${err.message}`);
    // }
  },

  getStyles: async (req, res) => {
    const { productId } = req.params;
    console.log(productId);

    try {
      const products = await pool.query('SELECT * FROM styles WHERE productId = $1;', [productId]);
      res.json(products.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(404).send(`Error retrieving styles list: ${err.message}`);
    }
  },

  getRelated: (req, res) => {
    const { productId } = req.params;
    // axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${productId}/related`, {
    //   headers: { Authorization: `${API_KEY}` },
    // })
    //   .then(result => {
    //     res.json(result.data);
    //   })
    //   .catch(err => {
    //     res.status(404).send(`Error retrieving related items: ${err}`);
    //   });
  }
}