const moment = require('moment');
const jwt = require('jsonwebtoken');

createToken = (user) => {
    return jwt.sign({ user }, 'secretkey', { expiresIn: '3d' });
}

verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

showInsideToken = (token) => {
    return jwt.verify(token, 'secretkey', (err, authData) => {
        if (err) {
            return null;
        } else {
            return authData.user;
        }
    });
}

destroyToken = (token) => {
    return jwt.destroy(token);
}

module.exports = {
    createToken,
    verifyToken,
    showInsideToken,
    destroyToken
};