import mongoose from 'mongoose';

// Define the post schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // require a title for a post
  },
  email: {
    type: String,
    required: true, // require a message for a post
  },
  password: {
    type: String,
    required: true, // require a creator for a post
  },
  id: {
    type: String
  },
});

// Create the PostMessage model
const UserMessage = mongoose.model('UserMessage', userSchema);

// Export the model
export default UserMessage;
