const userModel = require("../models/usermodel")

class Admin {
    static userList = async (req, res, next) => {
        try {
            const userData = await userModel.find().select('name email') 

            if (userData) {
                const data = userData.length > 0 ? userData : "empty";
                return res.json({ data })
            } else {
                return res.status(404).json({ err: '404 Not Found' })

            }

        } catch (err) {
            return next(err)
        }
    }
}

module.exports=Admin