const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {
    // first check request headers has authentication or not
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'Token not found' });

    // Extract jwt token from request headers
    const token = req.headers.authorization.split(' ')[1]; // Assuming 'Bearer <token>'
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
}


// Funtion to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000 });
}

module.exports = { jwtAuthMiddleware, generateToken };