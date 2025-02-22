const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: [true, 'Text required'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
