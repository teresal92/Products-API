const pool = require('../db');

module.exports = {
  // Retrieves list of products
  getProducts: async (req, res) => {
    try {
      const text = 'SELECT * FROM products LIMIT 5;';
      const result = await pool.query(text);
      res.status(200).send(result.rows);
    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  },

  // Returns all product level information for a specified product id.
  getProductInfo: async (req, res) => {
    const { productId } = req.params;
    try {
      const text = `SELECT *,
                    (SELECT json_agg(
                      json_build_object(
                      "feature", feature,
                      "value", value)
                    ) AS features
                    FROM features
                    WHERE product_id = $1)
                    FROM products WHERE id = $1;`;
      const params = [productId];
      const result = await pool.query(text, params);
      res.status(200).send(result.rows[0]);
    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  },

  // Retrieves list of styles associated with given product id
  getStyles: async (req, res) => {
    const { productId } = req.params;
    try {
      const text = `SELECT styles.productId AS product_id,
                    (SELECT to_json(json_agg(results)) AS results
                      FROM (SELECT
                              styles.id AS style_id,
                              styles.name,
                              styles.original_price,
                              styles.sale_price,
                              styles.default_style AS "default?",
                              json_agg(json_build_object('thumbnail_url',
                              photos.thumbnail_url, 'url', photos.url)
                            ) AS photos,
                            json_object_agg(
                              skus.id,
                              json_build_object(
                                'size', skus.size,
                                'quantity', skus.quantity)
                              ) AS skus
                        FROM styles
                        LEFT OUTER JOIN photos
                          ON styles.id = photos.styleId
                        LEFT OUTER JOIN skus
                          ON styles.id = skus.styleId
                        WHERE styles.productId = $1
                        GROUP BY styles.id
                      ) results)
                  FROM styles
                  WHERE styles.productId = $1;`;
      const params = [productId];
      const results = await pool.query(text, params);
      res.status(200).send(results.rows[0]);
    } catch (err) {
      res.status(404).send(`Error retrieving styles list: ${err.message}`);
    }
  },

  // Get related products by product Id
  getRelated: async (req, res) => {
    const { productId } = req.params;
    try {
      const text = `SELECT related_product_id
                    FROM related
                    WHERE current_product_id = $1;`;
      const params = [productId];
      const results = await pool.query(text, params);
      const result = results.rows.map((product) => product.related_product_id);
      res.status(200).send(result);
    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  },

};
