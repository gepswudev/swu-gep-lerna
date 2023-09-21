const auth = (req, res, next) => {
    if (req.userData.role !== 'admin') {
        return res.status(401).send({
            status: 'error',
            message: 'Only admin can access this endpoint'
        });
    }
    next();
}

module.exports = auth;
