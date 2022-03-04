// const axios = require('axios');
const pool = require('../db')

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
      const products = await pool.query('SELECT *, \
                                        (SELECT json_agg(json_build_object( \
                                          "feature", feature, \
                                          "value", value )) \
                                        AS features \
                                        FROM features \
                                        WHERE product_id = $1) \
                                        FROM products WHERE id = $1;', [productId]);
      res.json(products.rows[0]);
    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  },

  // retrieve all styles with the product id
  getStyles: async (req, res) => {
    const { productId } = req.params;
    try {
      const products = await pool.query("SELECT styles.productId  AS product_id, \
                                          (SELECT to_json(json_agg(results)) AS results \
                                            FROM (SELECT styles.id AS style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS \"default?\", \
                                                    json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos, \
                                                    json_object_agg(skus.id, json_build_object('size', skus.size, 'quantity', skus.quantity)) AS skus \
                                              FROM styles \
                                              LEFT OUTER JOIN photos \
                                                ON styles.id = photos.styleId \
                                              LEFT OUTER JOIN skus \
                                                ON styles.id = skus.styleId \
                                              WHERE styles.productId = $1 \
                                              GROUP BY styles.id, styles.name, styles.original_price, styles.sale_price, styles.default_style, skus.id \
                                            ) results) \
                                        FROM styles \
                                        WHERE styles.productId = $1;", [productId]);
      res.json(products.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(404).send(`Error retrieving styles list: ${err.message}`);
    }
  },

  // getStyles: async (req, res) => {
  //   const { productId } = req.params;
  //   try {
  //     const products = await pool.query("SELECT styles.productId  AS product_id, \
  //                                         (SELECT to_json(json_agg(results)) AS results \
  //                                           FROM ( \
  //                                             SELECT styles.id AS style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS \"default?\", \
  //                                                   json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos, \
  //                                                   to_json(json_build_object(skus.id, skus.id)) AS skus\
  //                                             FROM styles \
  //                                             INNER JOIN photos \
  //                                               ON styles.id = photos.styleId \
  //                                             INNER JOIN skus \
  //                                               ON styles.id = skus.styleId \
  //                                             WHERE styles.productId = $1 \
  //                                             GROUP BY styles.id, styles.name, styles.original_price, styles.sale_price, styles.default_style, skus.id \
  //                                           ) results ) \
  //                                       FROM styles \
  //                                       WHERE styles.productId = $1;", [productId]);
  //     res.json(products.rows[0]);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(404).send(`Error retrieving styles list: ${err.message}`);
  //   }
  // },

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