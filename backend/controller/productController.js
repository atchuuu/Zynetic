const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, description, category, price, rating } = req.body;
  try {
    const product = new Product({ name, description, category, price, rating });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Product creation failed!' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Can’t fetch products!' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ msg: 'Product not found, bro!' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Update failed!' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ msg: 'Product not found, dude!' });
    res.json({ msg: 'Product deleted, bro!' });
  } catch (err) {
    res.status(500).json({ msg: 'Delete failed!' });
  }
};

exports.filterProducts = async (req, res) => {
  const { category, minPrice, maxPrice, rating } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = minPrice;
  if (maxPrice) filter.price.$lte = maxPrice;
  if (rating) filter.rating = { $gte: rating };

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Filter messed up!' });
  }
};

exports.searchProducts = async (req, res) => {
  const { q } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Search failed!' });
  }
};