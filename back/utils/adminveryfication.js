function AdminVeryfication(req, res, next) {
    try {
        if (req.cookies.t_role === 'admin') {
            next()
        } else {
            return res.status(404).json({ message: '404 Not Found' })
        }
    }
    catch (err) {
        return res.status(500).json({ err: err.message || err })
    }
}

module.exports = AdminVeryfication