const { Router } = require('express');
const { adminGetReports, adminDeleteReport } = require('../../controllers/Reports');

const router = Router();

router.get('/', adminGetReports);
router.get('/:idReport', adminGetReports);
router.delete('/:idReport', adminDeleteReport)

module.exports = router