const { model, Schema } = require('mongoose');

const task = new Schema(
    {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serverId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignTo: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  archive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dateCreated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = model('task', task);