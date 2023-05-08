const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
  })

const commentsSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId },
    content: String,
  })

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    description: String,
    favorites: [favoritesSchema],
    comments: [commentsSchema],
    location: String,
    postDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Post', postSchema);


