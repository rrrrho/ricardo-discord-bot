const { model, Schema } = require('mongoose');

const task = new Schema(
    {
  text: {
    type: String,
    allowNull: false,
  },
  serverId: {
    type: String,
    allowNull: false,
  },
  assignTo: {
    type: String,
    default: false,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  archive: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date(),
  },
});

module.exports = model('task', task);