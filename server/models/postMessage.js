import mongoose from 'mongoose';

// Define the post schema
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true, // require a title for a post
  },
  message: {
    type: String,
    required: true, // require a message for a post
  },
  creator: {
    type: String,
    required: true, // require a creator for a post
  },
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Create the PostMessage model
const PostMessage = mongoose.model('PostMessage', postSchema);

// Export the model
export default PostMessage;
