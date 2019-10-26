const db = require('../../db');
const Usuario = db.usuario;

module.exports = async (req, res, next) => {
    try {
        const decodeUser = Object.assign({}, req.authData);
        const user = await Usuario.findOne({ where: { id: decodeUser.user.id } });
        if (!user) {
            res.status(401).end();
        }
        req.currentUser = user.dataValues;
        return next();
    } catch (error) {
        return res.json(error).status(500);
    }
}