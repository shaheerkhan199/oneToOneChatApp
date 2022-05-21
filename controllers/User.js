const Response = require("../utils/Response")
const Model = require("../models")

module.exports = {
    getAllUsers: async function (req, res) {
        try {
            const users = await Model.User.find({}, { password: 0 }).sort({updatedAt: -1})
            return res.status(200).send(Response.success(200, users))
        } catch (error) {
            console.log(error)
            return res.status(500).send(Response.failure(500, "Server Error"))
        }
    }
}