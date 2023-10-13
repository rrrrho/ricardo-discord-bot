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
    defaultValue: false,
  },
  isDone: {
    type: Boolean,
    defaultValue: false,
  },
  archive: {
    type: Boolean,
    defaultValue: false,
  },
  dateCreated: {
    type: Date,
    defaultValue: Date(),
  },
});

module.exports = model('task', task);