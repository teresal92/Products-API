// const axios = require('axios');
const pool = require('../db')

module.exports = {
  // Retrieves list of products
  getProducts: async (req, res) => {
    const start = Date.now();
    try {
      const text = 'SELECT * FROM products LIMIT 5;'
      const result = await pool.query(text);
      const duration = Date.now() - start;
      console.log('executed query', {text, duration, rows: result.rowCount});
      res.json(result.rows);

    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  },

  // Returns all product level information for a specified product id.
  // SUBQUERY
  getProductInfo: async (req, res) => {
    const { productId } = req.params;
    const start = Date.now();
    try {
      const text = 'SELECT *, \
                    (SELECT json_agg(json_build_object( \
                      "feature", feature, \
                      "value", value )) \
                    AS features \
                    FROM features \
                    WHERE product_id = $1) \
                    FROM products WHERE id = $1;'
      const params = [productId]
      const result = await pool.query(text, params);

      const duration = Date.now() - start;
      console.log('executed query', {text, duration, rows: result.rowCount});
      res.json(result.rows);
    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  },

  // JOIN
  // getProductInfo: async (req, res) => {
  //   const { productId } = req.params;
  //   const start = Date.now();
  //   try {
  //     const text = 'EXPLAIN ANALYZE SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, \
  //                     json_agg(json_build_object( \
  //                     "feature", f.feature, \
  //                     "value", f.value )) AS features \
  //                   FROM products AS p \
  //                   LEFT OUTER JOIN features AS f \
  //                   ON p.id = f.product_id \
  //                   WHERE p.id = $1 \
  //                   GROUP BY p.id;'
  //     const params = [productId]
  //     const result = await pool.query(text, params);

  //     const duration = Date.now() - start;
  //     console.log('executed query', {text, duration, rows: result.rowCount});
  //     res.json(result.rows);
  //   } catch (err) {
  //     res.status(404).send(`Error retrieving product info list: ${err.message}`);
  //   }
  // },

  getStyles: async (req, res) => {
    const { productId } = req.params;
    const start = Date.now();
    try {
      const text = "SELECT styles.productId  AS product_id, \
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
                        GROUP BY styles.id \
                      ) results) \
                  FROM styles \
                  WHERE styles.productId = $1;"
      const params = [productId]
      const results = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log('executed query', {text, duration, rows: results.rowCount});
      res.json(results.rows);
    } catch (err) {
      console.error(err);
      res.status(404).send(`Error retrieving styles list: ${err.message}`);
    }
  },

  // Postgres Transformation
  // getStyles: async (req, res) => {
  //   const { productId } = req.params;
  //   const start = Date.now();
  //   try {
  //     const text = "SELECT styles.productId  AS product_id, \
  //                   (SELECT to_json(json_agg(results)) AS results \
  //                     FROM (SELECT styles.id AS style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS \"default?\", \
  //                             json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos, \
  //                             json_object_agg(skus.id, json_build_object('size', skus.size, 'quantity', skus.quantity)) AS skus \
  //                       FROM styles \
  //                       LEFT OUTER JOIN photos \
  //                         ON styles.id = photos.styleId \
  //                       LEFT OUTER JOIN skus \
  //                         ON styles.id = skus.styleId \
  //                       WHERE styles.productId = $1 \
  //                       GROUP BY styles.id \
  //                     ) results) \
  //                 FROM styles \
  //                 WHERE styles.productId = $1;"
  //     const params = [productId]
  //     const results = await pool.query(text, params);
  //     const duration = Date.now() - start;
  //     console.log('executed query', {text, duration, rows: results.rowCount});
  //     res.json(results.rows);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(404).send(`Error retrieving styles list: ${err.message}`);
  //   }
  // },

  getRelated: async (req, res) => {
    const { productId } = req.params;
    const start = Date.now();
    try {
      const text = 'SELECT related_product_id \
                    FROM related \
                    WHERE current_product_id = $1;'
      const params = [productId];
      const results = await pool.query(text, params);
      const duration = Date.now() - start;
      const result = results.rows.map(result => result.related_product_id);
      console.log('executed query', {text, duration, rows: results.rowCount});
      res.json(result);
      // res.json(results.rows);
    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  }
}

