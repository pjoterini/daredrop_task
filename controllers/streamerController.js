const mongoose = require('mongoose')
const Streamer = require('../models/streamerModel')

const getStreamers = async (req, res) => {
  const streamers = await Streamer.find({}).sort({ createdAt: -1 })

  return res.status(200).json(streamers)
}

const getStreamer = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: 'Streamer with this id does not exist' })
  }

  const streamer = await Streamer.findById(id)

  if (!streamer) {
    return res
      .status(404)
      .json({ error: 'Streamer with this id does not exist' })
  }

  return res.status(200).json(streamer)
}

const createStreamer = async (req, res) => {
  const { name, description, platform, voteStatus } = req.body

  try {
    const streamer = await Streamer.create({
      name,
      description,
      platform,
      voteStatus
    })
    return res.status(201).json(streamer)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const VoteOnStreamer = async (req, res) => {
  const { id } = req.params
  let vote

  if (req.body.vote) {
    vote = 1
  } else {
    vote = -1
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: 'Streamer with this id does not exist' })
  }

  const { voteStatus } = await Streamer.findById(id)

  const streamer = await Streamer.findOneAndUpdate(
    { _id: id },
    {
      voteStatus: voteStatus + vote
    },
    { new: true }
  )

  if (!streamer) {
    return res
      .status(404)
      .json({ error: 'Streamer with this id does not exist' })
  }

  return res.status(200).json(streamer)
}

module.exports = {
  getStreamers,
  getStreamer,
  createStreamer,
  VoteOnStreamer
}
