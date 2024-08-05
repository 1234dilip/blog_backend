const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      discription: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      published: {
        type: Boolean,
        default: false
      },
      comments: [{
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        comment: {
          type: String,
          required: true
        },
        commentedAt: {
          type: Date,
          default: Date.now
        }
      }],
      views: {
        type: Number,
        default: 0
      },
      likes: {
        type: Number,
        default: 0
      },
      likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
      image: {
        type: String
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      isDeleted:{
        type: Boolean,
        default: false
      }

})

module.exports = mongoose.model("Blog",BlogSchema)