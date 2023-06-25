const express = require('express')
const {
  getStreamers,
  getStreamer,
  createStreamer,
  VoteOnStreamer
} = require('../controllers/streamerController')

const router = express.Router()

router.get('/', getStreamers)

router.get('/:id', getStreamer)

router.post('/', createStreamer)

router.patch('/:id/vote', VoteOnStreamer)

module.exports = router
