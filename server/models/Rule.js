import mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RuleSection',
    required: true
  },
  orderIndex: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
});

// Virtual for id
ruleSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised
ruleSchema.set('toJSON', {
  virtuals: true
});

const Rule = mongoose.model('Rule', ruleSchema);

export default Rule;