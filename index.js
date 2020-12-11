const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('wavBase Server'));

module.exports = router;