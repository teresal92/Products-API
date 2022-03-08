const controller = require('./controllers.js');
const router = require('express').Router();

router.route('/loaderio-db8dd5d41051ef7d341b88565e87b1dc')
  .get(res.send('loaderio-db8dd5d41051ef7d341b88565e87b1dc'));

router.route('/products')
  .get(controller.getProducts);

router.route('/products/:productId')
  .get(controller.getProductInfo);

router.route('/products/:productId/styles')
  .get(controller.getStyles);

router.route('/products/:productId/related')
  .get(controller.getRelated);

module.exports = router;