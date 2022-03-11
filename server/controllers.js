
const pool = require('../db')

module.exports = {
  // Retrieves list of products
  getProducts: async (req, res) => {
    const start = Date.now();
    try {
      const text = `SELECT * FROM products LIMIT 5;`
      const result = await pool.query(text);
      const duration = Date.now() - start;
      // console.log('executed query', {text, duration, rows: result.rowCount});
      res.status(200).send(result.rows);

    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  },

  // Returns all product level information for a specified product id.

  // Utilizing LEFT JOIN
  getProductInfo: async (req, res) => {
    const { productId } = req.params;
    const start = Date.now();
    try {
      const text = 'SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, \
                      json_agg(json_build_object( \
                      "feature", f.feature, \
                      "value", f.value )) AS features \
                    FROM products AS p \
                    LEFT OUTER JOIN features AS f \
                    ON p.id = f.product_id \
                    WHERE p.id = $1 \
                    GROUP BY p.id;'
      const params = [productId]
      const result = await pool.query(text, params);

      const duration = Date.now() - start;
      console.log('executed query', {text, duration, rows: result.rowCount});
      res.json(result.rows);
    } catch (err) {
      res.status(404).send(`Error retrieving product info list: ${err.message}`);
    }
  },

  // Utilizing Postgres Transformation
  getStyles: async (req, res) => {
    const { productId } = req.params;
    const start = Date.now();
    try {
      const text = `SELECT styles.productId AS product_id,
                            styles.id AS style_id,
                            styles.name,
                            styles.original_price,
                            styles.sale_price,
                            styles.default_style,
                            photos.thumbnail_url,
                            photos.url,
                            skus.id,
                            skus.size,
                            skus.quantity
                        FROM styles
                        LEFT OUTER JOIN photos
                          ON styles.id = photos.styleId
                        LEFT OUTER JOIN skus
                          ON styles.id = skus.styleId
                        WHERE styles.productId = $1;`
      const params = [productId];
      const results = await pool.query(text, params);
      const duration = Date.now() - start;
      // console.log('executed query', {text, duration, rows: results.rowCount});
      res.status(200).send(results.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(404).send(`Error retrieving styles list: ${err.message}`);
    }
  },

  // Get related products by product Id
  getRelated: async (req, res) => {
    const { productId } = req.params;
    const start = Date.now();
    try {
      const text = `SELECT related_product_id
                    FROM related
                    WHERE current_product_id = $1;`
      const params = [productId];
      const results = await pool.query(text, params);
      const duration = Date.now() - start;
      const result = results.rows.map(result => result.related_product_id);
      //console.log('executed query', {text, duration, rows: results.rowCount});
      res.status(200).send(result);
    } catch (err) {
      res.status(404).send(`Error retrieving product list: ${err.message}`);
    }
  }
}