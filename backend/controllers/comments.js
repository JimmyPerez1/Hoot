const Comment = require('../models/hoot');

module.exports = {
  index,
  create,
  show,
  update,
  deleteComment
};

async function index(req, res) {
  try {
    const hoots = await Comment.find({});
    // Below would return all hoots for just the logged in user
    // const hoots = await Comment.find({author: req.user._id});
    res.json(hoots);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
}

async function create(req, res) {
try {
    req.body.author = req.user._id;
    const hoot = await Hoot.findById(req.params.hootId);
    hoot.comments.push(req.body);
    await hoot.save();

    // Find the newly created comment:
    const newComment = hoot.comments[hoot.comments.length - 1];

    newComment._doc.author = req.user;

    // Respond with the newComment:
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

async function show(req, res) {
  try {
    const comment = await Comment.findById(req.params.hootId).populate('author');
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to fetch posts' });
  }
}

async function update(req, res) {
  try {
   const comment = await Comment.findById(req.params.hootId);
    // Check permissions:
    if (!comment.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }
      const updatedHoot = await Comment.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true }
    );
    // Append req.user to the author property:
    updatedHoot._doc.author = req.user;
    res.json(updatedHoot);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to update post' });
  }
}

async function deleteComment(req, res) {
   try {
    const comment = await Comment.findById(req.params.hootId);

    if (!comment.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedHoot = await Comment.findByIdAndDelete(req.params.hootId);
    res.json(deletedHoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};