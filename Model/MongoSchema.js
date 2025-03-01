const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: false }, 
    featurePost: { type: Boolean, default: false }, 
    category: { type: String, enum: ['health', 'tech', 'news'], required: true }, 
    status: { type: String, enum: ['draft', 'public'], default: 'draft' }, 
    createdAt: { type: Date, default: Date.now },
  });



  const CommentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });




  const postModel = mongoose.model('Post', PostSchema);
  const commentModel = mongoose.model('Comment', CommentSchema);

 module.exports = {postModel, commentModel};