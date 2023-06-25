const mongoose = require('mongoose')

const streamerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    platform: {
      type: String,
      required: true
    },
    voteStatus: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Streamer', streamerSchema)
