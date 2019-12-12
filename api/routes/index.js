// paths for api that link to controllers
const express = require('express');

const router = express.Router();

const ctrlMain = require('../controllers/main');

router
  .route('/shorturl/:shortUrl')
  .get(ctrlMain.urlsReadShortUrl);

router.
  route('/shorturl/new')
  .post(ctrlMain.urlCreate);

module.exports = router;