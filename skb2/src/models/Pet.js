import mongoose from 'mongoose';
import _ from 'lodash';
const {Schema} = mongoose;

const PetSchema = new Schema({
  type: {
    type: String,
    enum: ['cat', 'dog'],
    requred: true
  },
  name: {
    type: String,
    requred: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    requred: true,
  }
}, {
  timestamps: true,
});

PetSchema.methods.toJSON = function() {
  return _.pick(this, ['name', 'type', 'owner']);
};

export default mongoose.model('Pet', PetSchema);
