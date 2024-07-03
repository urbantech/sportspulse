const mongoose = require('mongoose');

const FunctionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const FunctionModel = mongoose.model('Function', FunctionSchema);

module.exports = FunctionModel;
