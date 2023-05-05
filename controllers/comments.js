const Post = require("../models/post")

module.exports = {
    create,
    deleteComment
}

async function create(req, res){
    try {
        const post = await Post.findById(req.paramas.id);
        post.comments.push({username: req.user.username, userId: req.user._id, content: req.user.content})
        await post.save()
        res.status(201).json({data: "Added Comment"})

    }catch(err){
        console.log(err, 'error in create comment function')
        res.status(400).json({err})
    }
}

async function deleteComment(req, res){
    try {
        const post = await Post.findOne({'comments._id': req.params.id, 'comments.username': req.user.username});
        post.comments.remove(req.parmas.id)
        await post.save()
        res.json({data: 'comment removed'})
    }catch(err){
        console.log(err, "error in delete comment function")
        res.status(400).json({err})
    }
}