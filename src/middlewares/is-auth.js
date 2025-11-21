const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    req.userEmail = decoded.email || null;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};
