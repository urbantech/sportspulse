const FunctionModel = require('../models/functionModel');

// Create a new function
exports.createFunction = async (req, res) => {
    try {
        const newFunction = new FunctionModel(req.body);
        const savedFunction = await newFunction.save();
        res.status(201).json(savedFunction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing function
exports.updateFunction = async (req, res) => {
    try {
        const functionId = req.params.id;
        const updateData = req.body;
        const updatedFunction = await FunctionModel.findByIdAndUpdate(functionId, updateData, { new: true });

        if (!updatedFunction) {
            return res.status(404).json({ message: 'Function not found' });
        }

        res.status(200).json(updatedFunction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
