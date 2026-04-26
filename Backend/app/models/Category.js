const mongoose = require('mongoose');

// Helper function to generate slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true, lowercase: true },
  description: String
});

// Auto-generate slug before save
categorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = generateSlug(this.name);
  }
  next();
});

// Also handle findOneAndUpdate
categorySchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.name && !update.slug) {
    update.slug = generateSlug(update.name);
  }
  next();
});

categorySchema.index({ slug: 1 });

module.exports = mongoose.model('Category', categorySchema);
