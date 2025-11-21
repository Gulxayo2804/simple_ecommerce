const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role
    });
  
  } catch (err) {
    next(err);
  }
};
