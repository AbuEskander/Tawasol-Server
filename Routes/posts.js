const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
router.post(
  "/",
  auth,
  check("text", "Enter Text").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send(err.message);
    }
  }
);
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
});
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      user: req.user.id,
      _id: req.params.post_id,
    });
    if (!post) {
      return res.status(400).send("There is no post with this user");
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
});
module.exports = router;
