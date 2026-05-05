const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ctrl = require('../controllers/productController')

// Public read endpoints (main site should be able to fetch listings without auth)
router.get('/', ctrl.list)
router.get('/:id', ctrl.get)

// Protected write endpoints for admin only
router.post('/', auth, ctrl.create)
router.put('/:id', auth, ctrl.update)
router.delete('/:id', auth, ctrl.remove)

module.exports = router
