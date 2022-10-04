const {Schema, model} = require('mongoose')
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    minLength: 1,
    maxlength: 280,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema]
},
  {
    toJSON: {
      virtuals: true,
    },
    id: false, 
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual('formatDate').get(function () {
  return this.createdAt.toLocaleDateString();
})

const Thought = model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

module.exports = Thought;

