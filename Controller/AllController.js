const {postModel, commentModel}= require('../Model/MongoSchema');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const name = process.env.USER_NAME;
const mail = process.env.EMAIL;
const hashedPassword = process.env.ADMIN_PASSWORD;




const justGet = (req,res)=>{
res.send("verify")
};


const getRoute = async(req,res)=>{

  try {
    const allPosts = await postModel.find();
    res.status(200).send(allPosts);
  } catch (error) {
    res.status(404).send(`posts not found ${error.message}`);
  }  
    
    };



    const commentsGetRoute = async (req, res) => {
      try {
          const postId = req.params.id; 
  
          const allComments = await commentModel.find({ postId });
  
          if (!allComments.length) {
              return res.status(404).json({ message: "No comments found for this post" });
          }
  
          res.status(200).json(allComments);
      } catch (error) {
          res.status(500).json({ message: "Server Error", error: error.message });
      }
  };
  
  


    const allCommentsGetRoute = async(req,res) =>{
      try {
        const allComments = await commentModel.find();
        res.status(200).send(allComments);
      } catch (error) {
        res.status(404).send(`posts not found ${error.message}`);
      }  
    };



const blogPostRoute = async (req, res) => {
        try {
          const { title, description, photo, featurePost, category, status } = req.body;
      
          const newPost = new postModel({
            title,
            description, 
            photo,
            featurePost,
            category,
            status,
          });
      
          await newPost.save();
          res.status(201).json({ message: 'Post created successfully', post: newPost });
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      };





 const commentsPostRoute = async (req, res) => {
        try {
          const { postId, userName, email, comment } = req.body;
      
          const newComment = new commentModel({
            postId,
            userName,
            email,
            comment,
          });
      
          await newComment.save();
          res.status(201).json({ message: 'Comment added successfully', comment: newComment });
        } catch (error) {
          res.status(500).json({ error: 'Server error' });
        }
      };



      const postsPutRoute = async (req, res) => {
        try {
          const { title, description, photo, featurePost, category, status } = req.body;
          const _id = req.params.id;
      
          const post = await postModel.findById(_id);
      
          if (!post) {
            return res.status(404).json({ error: 'Post not found or you do not have permission to update this post' });
          }
      
          post.title = title || post.title;
          post.description = description || post.description;
          post.photo = photo || post.photo;
          post.featurePost = featurePost ?? post.featurePost;
          post.category = category || post.category;
          post.status = status || post.status;
      

          await post.save();
      
          res.status(200).json({ message: 'Post updated successfully', post });
      
        } catch (error) {
          res.status(500).json({ error: 'Server error', details: error.message });
        }
      };
      




      const postDeleteRoute = async (req, res) => {
        try {
          const _id = req.params.id;
      
          const dPost = await postModel.findByIdAndDelete(_id);
  
          if (!dPost) {
            return res.status(404).json({ error: 'Post not found or already deleted' });
          }
      
          res.status(200).json({ message: 'Post deleted successfully', deletedPost: dPost });
        } catch (error) {
          res.status(500).json({ error: 'Server error', details: error.message });
        }
      };
      




      const commentDeleteRoute = async (req,res)=>{ 
        try {
          const _id = req.params.id;
      
          const dCom = await commentModel.findByIdAndDelete(_id);
  
          if (!dCom) {
            return res.status(404).json({ error: 'comment not found or already deleted' });
          }
      
          res.status(200).json({ message: 'comment deleted successfully', deletedComment: dCom });
        } catch (error) {
          res.status(500).json({ error: 'Server error', details: error.message });
        }

      };




      const adminLoginRoute = async (req, res) => {
        const { userName, email, password } = req.body;
    
        try {
            if (name !== userName) {
                return res.status(404).json({ message: "Username not found" });
            }
            if (mail !== email) {
                return res.status(404).json({ message: "Email not found" });
            }
    
            const isMatch = await bcrypt.compare(password, hashedPassword);
            if (!isMatch) {
                return res.status(401).json({ message: "Password does not match" });
            }
    
            
            const payload = { userName: name, userMail: mail };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });
    
            res.status(200).json({
                userName: name,
                userMail: mail,
                token: `Bearer ${token}`,
            });
    
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    };



    module.exports = {getRoute, blogPostRoute,commentsPostRoute, commentsGetRoute, postsPutRoute, postDeleteRoute, commentDeleteRoute, adminLoginRoute, allCommentsGetRoute, justGet};