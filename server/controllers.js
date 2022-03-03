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
    const { productId } = req.params;
    try {
      const products = await pool.query('SELECT *, (SELECT json_agg(json_build_object("feature", feature, "value", value)) AS features \
                                         FROM features where product_id = $1) FROM products WHERE style_id = $1;', [productId]);
      res.json(products.rows[0]);
    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  },

  getStyles: async (req, res) => {
    const { productId } = req.params;
    try {
      const products = await pool.query("SELECT styles.productId AS style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS default, \
                                                json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos \
                                        FROM styles \
                                        INNER JOIN photos ON styles.id = photos.styleId \
                                        WHERE styles.productId = $1 \
                                        GROUP BY styles.productId, styles.name, styles.original_price, styles.sale_price, styles.default_style;", [productId]);
      res.json(products.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(404).send(`Error retrieving styles list: ${err.message}`);
    }
  },

  // select json_build_object('thumbnail_url', thumbnail_url, 'url', url) AS photos FROM photos WHERE styleid = 1;
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