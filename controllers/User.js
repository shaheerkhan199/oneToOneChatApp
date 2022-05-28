const Response = require("../utils/Response")
const Model = require("../models")

module.exports = {
    getAllUsers: async function (req, res) {
        try {
            let users = await Model.User.find({}, { password: 0 }).sort({ updatedAt: -1 })
            users = JSON.parse(JSON.stringify(users))
            for (let user of users) {
                let lastChat = await Model.Chat.findOne({
                    $or: [
                        { senderId: req.user.data._id, receiverId: user._id },
                        { senderId: user._id, receiverId: req.user.data._id }
                    ]
                }).sort({ createdAt: -1 })
                if (lastChat) {
                    user["lastText"] = lastChat?.message
                }
            }
            return res.status(200).send(Response.success(200, users))
        } catch (error) {
            console.log(error)
            return res.status(500).send(Response.failure(500, "Server Error"))
        }
    }
}