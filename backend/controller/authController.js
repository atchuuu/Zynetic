const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists, man!' });

    // Hash the password manually
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    user = new User({ email, password: hashedPassword });
    await user.save(); // User gets saved here

    // Double-check user was saved
    if (!user._id) {
      throw new Error('User wasn’t saved properly, bro!');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1h' });
    if (!token) {
      throw new Error('Token generation failed, dude!');
    }

    // Send success response
    res.status(200).json({ token });
  } catch (err) {
    console.log('Error in signup:', err); // Log the error so we can see it
    res.status(500).json({ msg: 'Server crashed, oops!', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found, bro!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Wrong password, dude!' });

    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.log('Error in login:', err); // Log this too
    res.status(500).json({ msg: 'Server error, chill!', error: err.message });
  }
};