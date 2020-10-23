import mongoose from 'mongoose';

const recados = mongoose.Schema({
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('mural', recados);
