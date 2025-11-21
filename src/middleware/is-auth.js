const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const token = authHeader.split(' ')[1]; // Bearer TOKEN

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();

  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};
