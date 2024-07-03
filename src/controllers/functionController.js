const Function = require('../models/functionModel');

exports.createFunction = async (req, res) => {
  try {
    const functionModel = new Function(req.body);
    await functionModel.save();
    res.status(200).json(functionModel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
