const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");

function JwtVerification(req, res, next) {

    function clearCookies() {
        const cookies = Object.keys(req.cookies);
        cookies.forEach(cookie => {
            res.clearCookie(cookie);
        });
    }

    try {
        const cookies = req.cookies.t_user;
        if (cookies) {
            const token = jwt.verify(cookies, process.env.JWT_KEY);
            if (token) {
                const user = userModel.findById(token.id)
                    .then(user => {
                        if (!user) {
                            clearCookies()
                            return res.status(401).json({ message: 'JWT false' });
                        } else {
                            req.user = { id: user.id, name: user.name };
                            next();
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        clearCookies()
                        return res.status(401).json({ message: 'JWT false' });
                    });
            } else {

                return res.status(401).json({ message: "JWT false" })
            }
        } else {
            res.status(401).json({ message: "no login" })
        }

    } catch (err) {

        res.status(401).json({ message: "Token error" })
    }
}

module.exports = JwtVerification;
