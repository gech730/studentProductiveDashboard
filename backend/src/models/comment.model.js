import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    minlength: [3, 'Comment must be at least 3 characters'],
    maxlength: [500, 'Comment cannot exceed 500 characters'],
    trim: true,
  },
}, { timestamps: true });

const Comment = model('Comment', commentSchema);
export default Comment;
