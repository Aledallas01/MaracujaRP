import mongoose from 'mongoose';

const ruleSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    default: 'Shield'
  },
  orderIndex: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for id
ruleSectionSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised
ruleSectionSchema.set('toJSON', {
  virtuals: true
});

const RuleSection = mongoose.model('RuleSection', ruleSectionSchema);

export default RuleSection;