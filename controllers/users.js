const User = require('../models/user');
const Post = require('../models/post')
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  profile
};

const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();
const { v4: uuidv4 } = require('uuid');
const BUCKET_NAME = process.env.BUCKET;




async function signup(req, res) {
  console.log(req.body, ' < req.body', req.file, " < req.filed")
  if (!req.file) return res.status(400).json({error: "Please Submit a Photo"})

  const filePath = `son-of-a-beach/${uuidv4()}-${req.file.originalname}`;
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer};

  s3.upload(params, async function(err, data){
    if(err){
      console.log('==========')
      console.log(err, " err from aws, bucket name or keys are wrong");
      console.log('===============')
      res.status(400).json({error: "Error from aws, check terminal"})
    }
  })

  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}









async function login(req, res) {

 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}




async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
    // Then find all the posts that belong to that user
    if(!user) return res.status(404).json({error: 'User not found'})

    // using the post model to find all the users posts (the user from req.params)
    // finding all posts by a user, and populating the user property!
    const posts = await Post.find({user: user._id}).populate("user").exec();
    console.log(posts, ' this posts')
    res.status(200).json({posts: posts, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
