const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  postNewThought,
  updateThought,
  deleteThought,
  postNewReaction,
  deleteReaction,
} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/').get(getAllThoughts).post(postNewThought);

// /api/thoughts/:id
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(postNewReaction).delete(deleteReaction);

module.exports = router;