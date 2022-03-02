const controller = require('./controllers.js');
const router = require('express').Router();

router.route('/products')
  .get(controller.getProducts);

router.route('/products/:productId')
  .get(controller.getProductInfo);

router.route('/products/:productId/styles')
  .get(controller.getStyles);

router.route('/products/:productId/related')
  .get(controller.getRelated);

module.exports = router;