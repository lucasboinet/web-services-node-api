import mongoose from 'mongoose';

const GamesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  editor: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default: 'defaultProfile.png',
  }
});

export default mongoose.model('Games', GamesSchema);
