const express = require('express')
const { getCohorts, getCohort, saveCohort, updateCohort, deleteCohort } = require('../controllers/cohortController')

const router = express.Router()

// GET
// /api/v1/cohort
// /api/v1/cohort/:id
router.get('/', getCohorts)
router.get('/:cohortId', getCohort)

// POST
// /api/v1/cohort
router.post('/', saveCohort)

// PUT
// /api/v1/cohort/:id
router.put('/:cohortId', updateCohort)

// DELETE
// /api/v1/cohort/:id
router.delete('/:cohortId', deleteCohort)

module.exports = router
