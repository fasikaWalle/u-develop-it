const express = require('express');
const router = express.Router();

router.use(require('./CandidateRoutes'));
router.use(require('./PartyRoutes'))
router.use(require('./VotersRoutes'))
module.exports = router;
