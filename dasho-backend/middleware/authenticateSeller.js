// middleware/authenticateSeller.js
const jwt = require('jsonwebtoken');

const authenticateSeller = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Please authenticate as a seller' });
  }

  try {
     const decoded = jwt.decode(token);
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.sellerId = decoded._id; // Store seller ID in request for later use
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateSeller;
