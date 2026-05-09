import Comment from '../models/comment.model.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

const createComment = async (req, res) => {
  try {
    let { name, email, comment } = req.body;
    name = sanitize(name);
    email = sanitize(email);
    comment = sanitize(comment);

    if (!name || !email || !comment) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (comment.length < 3) {
      return res.status(400).json({ message: 'Comment must be at least 3 characters' });
    }

    const com = await Comment.create({ name, email, comment });
    res.status(201).json({ message: 'Thank you for your comment', comment: com });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getComments = async (_req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createComment, getComments };
