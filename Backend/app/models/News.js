const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: String,
  tags: [String],
  image: String,
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true }
});

newsSchema.index({ slug: 1, tags: 1, published: 1 });

module.exports = mongoose.model('News', newsSchema);
