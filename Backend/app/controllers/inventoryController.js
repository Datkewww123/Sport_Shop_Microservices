const Inventory = require('../models/Inventory');

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ product: req.params.productId });
    res.json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOneAndUpdate({ product: req.params.productId }, req.body, { new: true });
    res.json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createInventory = async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
