module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (req.currentUser.rol.includes(requiredRole)) {
            return next();
        } else {
            return res.status(200).send('EL usuario no tiene el ROL especifico para este endpoint');
        }
    }
}