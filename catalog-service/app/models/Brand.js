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

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true, lowercase: true },
  description: String
});

// Auto-generate slug before save
brandSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = generateSlug(this.name);
  }
  next();
});

// Also handle findOneAndUpdate
brandSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.name && !update.slug) {
    update.slug = generateSlug(update.name);
  }
  next();
});

brandSchema.index({ slug: 1 });

module.exports = mongoose.model('Brand', brandSchema);
