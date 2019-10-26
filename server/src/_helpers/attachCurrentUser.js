const db = require('../../db');
const Usuario = db.usuario;

module.exports = async (req, res, next) => {
    try {
        const decodeUser = req.authData;
        const user = await Usuario.findOne({ id: decodeUser.id });
        if (!user) {
            res.status(401).end();
        }
        req.currentUser = user;
        return next();
    } catch (error) {
        return res.json(error).status(500);
    }
}