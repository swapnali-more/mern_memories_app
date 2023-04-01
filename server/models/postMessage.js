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
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true, // require a creator for a post
  },
  tags: [String], // require a tags for a post
  selectedFile: String, // require a selectedFile for a post
  likes: {
    type: [String],
    default: [], // require a likes for a post
  },
  createdAt: {
    type: Date,
    default: new Date(), // require a createdAt for a post
  }, 
});

// Create the PostMessage model
const PostMessage = mongoose.model('PostMessage', postSchema);

// Export the model
export default PostMessage;
