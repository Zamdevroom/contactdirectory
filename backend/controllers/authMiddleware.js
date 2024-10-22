import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = decoded; // Assuming decoded token includes user info
        next();
    });
};

export default authMiddleware;
