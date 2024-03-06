const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");

function JwtVerification(req, res, next) {

    function clearCookies() {
        const cookies = Object.keys(req.cookies);
        return cookies.forEach(cookie => {
            res.clearCookie(cookie);
        });
    }

    try {
        const cookies = req.cookies.t_user;
        if (cookies) {
            const token = jwt.verify(cookies, process.env.JWT_KEY);
            if (token) {
                if (token.id !== req.cookies.t_id) {
                    console.log(true)
                    clearCookies()
                    return res.status(401).json({ message: 'false jwt' })
                }
                userModel.findById(token.id)
                    .then(user => {
                        if (!user) {
                            clearCookies()
                            return res.status(401).json({ message: 'JWT false' });
                        } else {
                            if (user.role !== req.cookies.t_role) {
                                res.cookie('t_role', user.role, { maxAge: 30 * 24 * 60 * 60 * 1000 })

                            } 
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
        console.log(err)
        if (req.cookies) {
            clearCookies()
        }

        res.status(401).json({ message: "Token error" })
    }
}

module.exports = JwtVerification;
