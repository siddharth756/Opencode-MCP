const { Router } = require('express');
const { create, list, getById, update, remove } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

const router = Router();

router.route('/')
  .post(protect, create)
  .get(protect, list);

router.route('/:id')
  .get(protect, getById)
  .put(protect, update)
  .delete(protect, remove);

module.exports = router;
