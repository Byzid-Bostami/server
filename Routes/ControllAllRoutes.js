const express = require('express');
const router = express.Router();
const {getRoute, blogPostRoute, commentsPostRoute, commentsGetRoute, postsPutRoute, postDeleteRoute, commentDeleteRoute, adminLoginRoute, allCommentsGetRoute, justGet} = require('../Controller/AllController');
const verifyToken = require('../Config/authMiddleware');


router.get('/',verifyToken, justGet);

router.get("/posts",getRoute);

router.get('/posts/:id', commentsGetRoute );

router.post('/comments', commentsPostRoute);

router.get('/comments',verifyToken, allCommentsGetRoute );

router.post('/posts',verifyToken, blogPostRoute);

router.put('/posts/:id',verifyToken, postsPutRoute);

router.delete('/posts/:id',verifyToken, postDeleteRoute);

router.delete('/comments/:id',verifyToken, commentDeleteRoute);

router.post('/login', adminLoginRoute);






module.exports = router;