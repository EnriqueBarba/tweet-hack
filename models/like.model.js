const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  tweet: { type: mongoose.Schema.Types.ObjectId },
  user: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
