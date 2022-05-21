const Response = require("../utils/Response")
const Model = require("../models")

module.exports = {
    getUserChat: async function (req, res) {
        try {
            const opponentId = req.params.id;
            const currentUserId = req.user.data._id;
            const chats = await Model.Chat.find({
                $or: [
                    { senderId: opponentId, receiverId: currentUserId },
                    { senderId: currentUserId, receiverId: opponentId }
                ]
            }).populate("senderId").populate("receiverId").sort({ createdAt: -1 })
            return res.status(200).send(Response.success(200, chats))
        } catch (error) {
            console.log(error)
            return res.status(500).send(Response.failure(500, "Server Error"))
        }
    }
}