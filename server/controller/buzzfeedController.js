const BuzzPost = require("../model/buzzpost");

const createbuzzpost=async(req,res)=>{
    const { createdBy, content, category, image } = req.body;
    try {
      const newPost = new BuzzPost({ createdBy, content, category, image });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}

const getAllpost = async (req, res) => {
  try {
    const posts = await BuzzPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSinglebuzzfeedpost=async(req,res)=>{
    const { id } = req.params;
    try {
      const posts = await BuzzPost.findById(id);
      if(!post){
        return res.status(404).json({success:false, message:"Post Not Found"})
      }
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const getpostbycretedby=async(req,res)=>{
    const { createdBy } = req.params;
    try {
      const posts = await BuzzPost.find({ createdBy });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}


const likeunlikeBuzzpos =async(req,res)=>{
    const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await BuzzPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const existingLikeIndex = post.like.findIndex((like) => like.userId === userId);

    if (existingLikeIndex !== -1) {
      post.like.splice(existingLikeIndex, 1);
    } else {
      post.like.push({ userId });
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const commentBuzzfeed = async (req, res) => {
  const { id } = req.params;
  const { userId, message } = req.body;

  try {
    const post = await BuzzPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.comment.push({ userId, message });
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletebuzzfeepost = async (req, res) => {
  app.delete("/api/buzzfeeds/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const post = await BuzzPost.findByIdAndDelete(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

const updatebuzzfeepost = async (req, res) => {
  const { id } = req.params;
  const { content, category, image } = req.body;

  try {
    const updatedPost = await BuzzPost.findByIdAndUpdate(
      id,
      { content, category, image },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports={getSinglebuzzfeedpost,createbuzzpost,getAllpost,getpostbycretedby,likeunlikeBuzzpos,commentBuzzfeed,deletebuzzfeepost,updatebuzzfeepost}